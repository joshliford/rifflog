package com.josh.rifflog_backend.service;

import com.josh.rifflog_backend.dto.AuthRequestDTO;
import com.josh.rifflog_backend.dto.AuthResponseDTO;
import com.josh.rifflog_backend.model.User;
import com.josh.rifflog_backend.repository.UserRepository;
import com.josh.rifflog_backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

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

    public AuthResponseDTO register(AuthRequestDTO authRequestDTO) throws Exception {
        String username = authRequestDTO.getUsername();

        if (userRepository.findByUsername(username).isPresent()) {
            throw new Exception("Username already exists");
        }

        String hashedPassword = passwordEncoder.encode(authRequestDTO.getPassword());

        User user = new User(
                username,
                hashedPassword
        );

        userRepository.save(user);

        String token  = jwtUtil.generateToken(user.getUsername());

        return new AuthResponseDTO(token);
    }

    public AuthResponseDTO login(AuthRequestDTO authRequestDTO) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            authRequestDTO.getUsername(),
                            authRequestDTO.getPassword()
                    )
            );
        } catch (BadCredentialsException exception) {
            throw new Exception("Incorrect username or password", exception);
        }

        String token = jwtUtil.generateToken(authRequestDTO.getUsername());

        return new AuthResponseDTO(token);
    }

}
