package com.ssafy.eureka.config;

import com.ssafy.eureka.domain.auth.jwt.CustomAccessDeniedHandler;
import com.ssafy.eureka.domain.auth.jwt.CustomAuthenticationEntryPoint;
import com.ssafy.eureka.domain.auth.jwt.CustomJwtAuthenticationFilter;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@RequiredArgsConstructor
public class SecurityConfig {

    private final CustomJwtAuthenticationFilter authenticationFilter;

    private static final String[] AUTH_WHITELIST = {
        "/swagger-ui/**", "/api/user/**"
    };

    @Bean
    public BCryptPasswordEncoder bCryptPasswordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration configuration)
        throws Exception {
        return configuration.getAuthenticationManager();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .csrf(AbstractHttpConfigurer::disable)
            .cors(Customizer.withDefaults())

            .sessionManagement(sessionManagement -> sessionManagement.sessionCreationPolicy((
                SessionCreationPolicy.STATELESS)))

            .formLogin(AbstractHttpConfigurer::disable)
            .httpBasic(AbstractHttpConfigurer::disable)

            .addFilterBefore(authenticationFilter, UsernamePasswordAuthenticationFilter.class)

            .exceptionHandling((ExceptionHandling) -> ExceptionHandling
                .authenticationEntryPoint(new CustomAuthenticationEntryPoint())
                .accessDeniedHandler(new CustomAccessDeniedHandler()))

            .authorizeHttpRequests(authoize -> authoize
                .requestMatchers(AUTH_WHITELIST).permitAll()
                .anyRequest().permitAll()
//                .anyRequest().authenticated()
            );

        return http.build();
    }
}
