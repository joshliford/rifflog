package com.josh.rifflog_backend.controller;

import com.josh.rifflog_backend.dto.AuthRequest;
import com.josh.rifflog_backend.dto.AuthResponse;
import com.josh.rifflog_backend.service.AuthService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<AuthResponse> register(@RequestBody AuthRequest authRequest) throws Exception {
        AuthResponse response = authService.register(authRequest);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/login")
    public ResponseEntity<AuthResponse> login(@RequestBody AuthRequest authRequest) throws Exception {
        AuthResponse response = authService.login(authRequest);
        return ResponseEntity.ok(response);
    }

}
