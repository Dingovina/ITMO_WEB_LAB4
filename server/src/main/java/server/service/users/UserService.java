package server.service.users;

import server.model.UserRepository;
import server.objects.users.SignupRequest;
import server.objects.users.User;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional(readOnly = true)
public class UserService {

    @Autowired
    private UserRepository repository;
    private PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Transactional
    public void signup(SignupRequest request) throws Exception {
        String email = request.email();
        Optional<User> existingUser = repository.findByEmail(email);
        if (existingUser.isPresent()) {
            throw new Exception(String.format("User with the email address '%s' already exists.", email));
        }

        String hashedPassword = passwordEncoder.encode(request.password());
        User user = new User();
        user.setEmail(email);
        user.setPassword(hashedPassword);
        repository.save(user);
    }
}