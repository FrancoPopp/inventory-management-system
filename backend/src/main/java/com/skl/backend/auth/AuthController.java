package com.skl.backend.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v0/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @PostMapping
    public ResponseEntity<AuthResponse> login(
            @RequestBody AuthRequest authRequest
    ) {
        UserDetails userDetails = authService.authenticate(
                authRequest.getUsername(),
                authRequest.getPassword()
        );
        String token = authService.generateToken(userDetails);
        AuthResponse authResponse = new AuthResponse(
                token,
                86400L
        );
        return ResponseEntity.ok(authResponse);
    }
}
