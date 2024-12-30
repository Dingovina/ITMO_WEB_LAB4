package server.service.users;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import server.model.UserRepository;
import server.objects.users.User;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserRepository repository;

  @Override
  public UserDetails loadUserByUsername(String email) {

    Optional<User> existingUser = repository.findByEmail(email);
    if (existingUser.isPresent()) {
      User user = existingUser.get();
      return org.springframework.security.core.userdetails.User.builder()
    .username(user.getEmail())
    .password(user.getPassword())
    .build();  
    }
    
    throw new UsernameNotFoundException(String.format("User does not exist, email: %s", email));
  }
}