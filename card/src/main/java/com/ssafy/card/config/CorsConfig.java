package com.ssafy.card.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    // Controller 단에서 cors 처리
    private final static String[] ALLOWED_ORIGINS = {
        "https://j10e101.p.ssafy.io",
        "http://localhost:8000",
        "https://j10e101.p.ssafy.io:8000"};

    @Override
    public void addCorsMappings(CorsRegistry registry) {

       // 모든 controller에서 port 3000에 대한 cors 처리 
        registry.addMapping("/**")
                .allowedOrigins(ALLOWED_ORIGINS)
                ;
    }
}
