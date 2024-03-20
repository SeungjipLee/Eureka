package com.ssafy.card.config;

import io.swagger.v3.oas.models.info.Info;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    private Info apiInfo(){
        return new Info()
                .title("SpringDoc")
                .description("Swagger UI")
                .version("1.0.0");
    }
}
