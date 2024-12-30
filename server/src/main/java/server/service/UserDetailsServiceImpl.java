package server.service;

import server.objects.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import server.model.UserRepository;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {

  @Autowired
  private UserRepository repository;

  @Override
  public UserDetails loadUserByUsername(String email) {

    User user;
    try {
      user = repository.findByEmail(email).orElseThrow(() ->
          new UsernameNotFoundException(String.format("User does not exist, email: %s", email)));
      return org.springframework.security.core.userdetails.User.builder()
      .username(user.getEmail())
      .password(user.getPassword())
      .build();
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }
}