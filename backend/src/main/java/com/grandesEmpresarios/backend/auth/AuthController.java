package com.grandesEmpresarios.backend.auth;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.security.core.userdetails.UserDetails;
import jakarta.servlet.http.HttpServletRequest;
import java.util.Map;
import java.util.HashMap;

import com.grandesEmpresarios.backend.jwt.JwtService;
import com.grandesEmpresarios.backend.user.UserService;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("/auth")
@RequiredArgsConstructor
public class AuthController {

    private final AuthService authService;
    private final JwtService jwtService;
    private final UserService userService;

    @PostMapping(value = "login")
    public ResponseEntity<AuthResponse> login(@RequestBody LoginRequest request) {
        return ResponseEntity.ok(authService.login(request));
    }

    @PostMapping(value = "register")
    public ResponseEntity<AuthResponse> register(@RequestBody RegisterRequest request) {
        return ResponseEntity.ok(authService.register(request));
    }

    @GetMapping("/validate")
    public ResponseEntity<Map<String, Object>> validateToken(HttpServletRequest request) {
        String authHeader = request.getHeader("Authorization");
        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
        }

        String token = authHeader.substring(7);
        try {
            String userEmail = jwtService.extractUsername(token);
            UserDetails userDetails = userService.loadUserByUsername(userEmail);
            
            if (jwtService.isTokenValid(token, userDetails)) {
                Map<String, Object> response = new HashMap<>();
                response.put("userId", jwtService.extractUserId(token));
                response.put("valid", true);
                return ResponseEntity.ok(response);
            }
        } catch (Exception e) {
            // Token inválido o expirado
        }
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).build();
    }

}
