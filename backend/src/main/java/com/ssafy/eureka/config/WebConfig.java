package com.ssafy.eureka.config;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

public class WebConfig implements WebMvcConfigurer {

    public static final String[] ALLOWED_ORIGIN = {"http://localhost:8000", "https://j10e101.p.ssafy.io"};
    public static final String[] ALLOWED_METHOD = {"GET", "POST", "PUT", "DELETE"};

    @Override
    public void addCorsMappings(final CorsRegistry registry) {
        registry.addMapping("/**")
            .allowedOrigins(ALLOWED_ORIGIN)
            .allowedMethods(ALLOWED_METHOD)
            .allowedHeaders("Authorization", "Content-Type")
            .allowCredentials(true)
            .maxAge(600);
    }
}
