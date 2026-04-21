package com.josh.rifflog_backend.security;

import com.josh.rifflog_backend.model.User;
import com.josh.rifflog_backend.repository.UserRepository;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User existingUser = userRepository.findByUsername(username).
            orElseThrow(() -> new UsernameNotFoundException("User not found with username " + username));

        return org.springframework.security.core.userdetails.User
                .withUsername(existingUser.getUsername())
                .password(existingUser.getPasswordHash())
                .authorities(java.util.List.of())
                .build();

    }

}
