package com.josh.rifflog_backend.repository;

import com.josh.rifflog_backend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    // custom method; returns Optional to prevent null pointer exceptions if user is not found
    Optional<User> findByUsername(String username);
}
