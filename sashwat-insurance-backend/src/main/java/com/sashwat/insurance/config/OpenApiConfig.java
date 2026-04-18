package com.sashwat.insurance.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info()
                        .title("Sashwat Insurance API")
                        .description("""
                                REST API for Sashwat Insurance Website - Phase 1 MVP
                                
                                **Base URL:** /api
                                
                                **Authentication:** Bearer JWT Token
                                - Register or Login to get your token
                                - Click 'Authorize' and paste: `Bearer <your_token>`
                                
                                **Public Endpoints (no auth required):**
                                - GET /products, /products/featured, /products/{id}
                                - POST /calculator/calculate
                                - POST /leads
                                - POST /auth/register, /auth/login
                                
                                **Admin Endpoints:** Requires ADMIN role JWT
                                """)
                        .version("1.0.0")
                        .contact(new Contact()
                                .name("Sashwat Insurance")
                                .email("dev@sashwatinsurance.com"))
                        .license(new License().name("Private").url("#")))
                .addSecurityItem(new SecurityRequirement().addList("Bearer Authentication"))
                .components(new Components()
                        .addSecuritySchemes("Bearer Authentication",
                                new SecurityScheme()
                                        .type(SecurityScheme.Type.HTTP)
                                        .scheme("bearer")
                                        .bearerFormat("JWT")
                                        .description("Paste your JWT token here (without 'Bearer ' prefix)")));
    }
}
