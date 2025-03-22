package com.grandesEmpresarios.backend.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        // Configuración básica de seguridad
        http
            .csrf(csrf -> csrf.disable())  // Desactivar CSRF para desarrollo
            .authorizeHttpRequests(authz -> 
                authz.anyRequest().permitAll()  // Permitir todas las solicitudes sin autenticación para desarrollo
            );
        
        return http.build();
    }
} 