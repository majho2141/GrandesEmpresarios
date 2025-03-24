package com.grandesEmpresarios.backend.config;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@ComponentScan(basePackages = "jwt")
public class JwtConfig {
    // Esta clase permite que Spring escanee el paquete jwt para encontrar componentes
} 