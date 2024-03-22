package com.ssafy.eureka.config;

import io.swagger.v3.oas.annotations.enums.SecuritySchemeType;
import io.swagger.v3.oas.annotations.security.SecurityScheme;
import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import io.swagger.v3.oas.models.security.SecurityRequirement;

@SecurityScheme(
    name = "JWT Auth",
    type = SecuritySchemeType.HTTP,
    bearerFormat = "JWT",
    scheme = "bearer"
)@Configuration
public class SwaggerConfig {

    // http://localhost:8000/swagger-ui/index.html

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
            .components(new Components())
            .addSecurityItem(new SecurityRequirement().addList("JWT Auth"))
            .info(apiInfo());
    }

    private Info apiInfo() {
        return new Info()
            .title("Springdoc")
            .description("Swagger UI")
            .version("1.0.0");
    }
}
