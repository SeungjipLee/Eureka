package com.ssafy.card.config;

import com.ssafy.card.JWT.JwtFilter;
import com.ssafy.card.JWT.JwtUtil;
import com.ssafy.card.JWT.LoginFilter;
import jakarta.servlet.http.HttpServletRequest;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import java.util.Collections;

@Configuration // SpringBoot에게 Configuration임을 알려줌
@EnableWebSecurity // 해당 클래스가 Security 내에서 관리받음
public class SecurityConfig {

    private final static String[] ALLOWED_ORIGINS = {
        "http://j10e101.p.ssafy.io",
        "https://j10e101.p.ssafy.io",
        "http://localhost:8000",
        "https://j10e101.p.ssafy.io:8000",
        "https://j10e101.p.ssafy.io:8000"};

    private final AuthenticationConfiguration authenticationConfiguration;
    private final JwtUtil jwtUtil;

    public SecurityConfig(AuthenticationConfiguration authenticationConfiguration, JwtUtil jwtUtil){

        this.authenticationConfiguration = authenticationConfiguration;
        this.jwtUtil = jwtUtil;
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration) throws Exception {

        return configuration.getAuthenticationManager();
    }
    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder(){

        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        // 로그인 단에서 cors 문제 처리
        http
                
                .cors((cors) -> cors
                        .configurationSource(new CorsConfigurationSource() {
                            @Override
                            public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {

                                CorsConfiguration configuration = new CorsConfiguration();
                                configuration.setAllowedOrigins(List.of(ALLOWED_ORIGINS));
                                configuration.setAllowedMethods(Collections.singletonList("*"));
                                configuration.setAllowCredentials(true);
                                configuration.setAllowedHeaders(Collections.singletonList("*"));
                                configuration.setMaxAge(3600L);

                                configuration.setExposedHeaders(Collections.singletonList("Authorization")); // header에 Authorization에 jwt을 넣어줘서 보낼 거

                                return configuration;
                            }
                        }));


        // 특정 경로 요청이 왔을 때 모든 사용자가 사용할 수 있게,
        // Admin 사용자만 사용할 수 있게,
        // 로그인 해야만 접근할 수 있게 등 로직 작성
        http
                // csrf disable
                .csrf((auth) -> auth.disable());

        http
                .formLogin((auth) -> auth.disable());

        http
                .httpBasic((auth) -> auth.disable());

        http
                .authorizeHttpRequests((auth) -> auth   // 특정 경로의 허용을 요청, 거부 설정
                        // 특정 경로에 대해서 작업을 진행할 때 설정
                        .requestMatchers("/auth/**").permitAll()
                        .requestMatchers("/join/**").permitAll()
                        .requestMatchers("/login").permitAll()
//                        .requestMatchers("/admin").hasRole("ADMIN")

                        // requestMatchers로 특정한 경로 외에 모든 경로에 대한 처리
                        .anyRequest().authenticated()
                );

        // 커스텀 필터 등록
        http
                .addFilterAt(new LoginFilter(authenticationManager(authenticationConfiguration), jwtUtil), UsernamePasswordAuthenticationFilter.class);

        http
                .sessionManagement((session) -> session
                        .sessionCreationPolicy(SessionCreationPolicy.STATELESS));
        http
                .addFilterBefore(new JwtFilter(jwtUtil), LoginFilter.class);

        return http.build();
    }
}
