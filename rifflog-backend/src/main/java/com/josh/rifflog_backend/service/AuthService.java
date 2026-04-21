package com.josh.rifflog_backend.service;

import com.josh.rifflog_backend.dto.AuthRequest;
import com.josh.rifflog_backend.dto.AuthResponse;
import com.josh.rifflog_backend.model.User;
import com.josh.rifflog_backend.repository.UserRepository;
import com.josh.rifflog_backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class AuthService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public AuthService(AuthenticationManager authenticationManager, JwtUtil jwtUtil, UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    public AuthResponse register(AuthRequest authRequest) throws Exception {
        String username = authRequest.getUsername();

        if (userRepository.findByUsername(username).isPresent()) {
            throw new Exception("Username already exists");
        }

        String hashedPassword = passwordEncoder.encode(authRequest.getPassword());

        User user = new User(
                username,
                hashedPassword
        );

        userRepository.save(user);

        String token  = jwtUtil.generateToken(user.getUsername());

        return new AuthResponse(token);
    }

    public AuthResponse login(AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequest.getUsername(),
                            authRequest.getPassword()
                    )
            );
        } catch (BadCredentialsException exception) {
            throw new Exception("Incorrect username or password", exception);
        }

        String token = jwtUtil.generateToken(authRequest.getUsername());

        return new AuthResponse(token);
    }

}
