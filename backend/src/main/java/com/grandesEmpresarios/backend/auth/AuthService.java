package com.grandesEmpresarios.backend.auth;

import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.http.HttpStatus;
import org.springframework.web.server.ResponseStatusException;

import com.grandesEmpresarios.backend.jwt.JwtService;
import com.grandesEmpresarios.backend.user.Role;
import com.grandesEmpresarios.backend.user.User;
import com.grandesEmpresarios.backend.user.UserRepository;
import com.grandesEmpresarios.backend.validation.EmailValidator;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {
    
    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final EmailValidator emailValidator;

    public AuthResponse login(LoginRequest request) {
        String normalizedEmail = emailValidator.normalizeEmail(request.getEmail());
        
        if (!emailValidator.isValidEmail(normalizedEmail)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email inválido");
        }

        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(
                normalizedEmail,
                request.getPassword()
            )
        );

        UserDetails user = userRepository.findByEmail(normalizedEmail)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Usuario no encontrado"));
        
        String token = jwtService.getToken(user);

        return AuthResponse.builder()
            .token(token)
            .build();
    }

    public AuthResponse register(RegisterRequest request) {
        String normalizedEmail = emailValidator.normalizeEmail(request.getEmail());
        
        if (!emailValidator.isValidEmail(normalizedEmail)) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Email inválido");
        }

        if (userRepository.findByEmail(normalizedEmail).isPresent()) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "El email ya está registrado");
        }

        User user = User.builder()
            .username(normalizedEmail)
            .password(passwordEncoder.encode(request.getPassword()))
            .email(normalizedEmail)
            .role(Role.USER)
            .enabled(true)
            .build();
        
        userRepository.save(user);
        return AuthResponse.builder()
            .token(jwtService.getToken(user))
            .build();
    }
}
