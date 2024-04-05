package com.ssafy.card.JWT;

import com.ssafy.card.Auth.dto.request.CustomUserDetails;
import com.ssafy.card.User.entity.UserEntity;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.util.Enumeration;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

//@Component
@Slf4j
@RequiredArgsConstructor
public class JwtFilter extends OncePerRequestFilter {

    // 토큰을 가지고 있는 유저인지 필터하는 곳
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        // request에서 Authorization 헤더를 찾음
        String authorization = request.getHeader("Authorization");

        log.debug("토큰 체크 : " + authorization);

        // Authorization 헤더 검증
        if(authorization == null){
            filterChain.doFilter(request, response);
            // 조건이 해당되면 메소드 종료 (필수)
            return;
        }

        String token = authorization;

        // 토큰 소멸 시간 검증
        if(jwtUtil.isExpired(token)){
            System.out.println("token expired");
            filterChain.doFilter(request, response);

            // 조건이 해당되면 메서드 종료 (필수)
            return;
        }

        String name = jwtUtil.getUsername(token);

        UserEntity userEntity = new UserEntity();
        userEntity.setName(name);

        CustomUserDetails customUserDetails = new CustomUserDetails(userEntity);

        Authentication authToken = new UsernamePasswordAuthenticationToken(customUserDetails, null, customUserDetails.getAuthorities());

        SecurityContextHolder.getContext().setAuthentication(authToken);

        log.debug(" 인증 성공 ");


        filterChain.doFilter(request, response);
    }
}
