package com.skl.backend.auth;

import org.springframework.security.core.userdetails.UserDetails;

public interface AuthService {

    UserDetails authenticate(String username, String password);

    String generateToken(UserDetails userDetails);

    UserDetails validate(String token);

}
