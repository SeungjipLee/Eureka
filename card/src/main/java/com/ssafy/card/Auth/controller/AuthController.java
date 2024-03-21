package com.ssafy.card.Auth.controller;

import com.ssafy.card.Auth.dto.request.MyDataRequestDto;
//import com.ssafy.card.Auth.service.AuthService;
import com.ssafy.card.Auth.dto.request.PayRequestDto;
import com.ssafy.card.Auth.dto.response.JwtTokenResponseDto;
import com.ssafy.card.Auth.service.AuthService;
import com.ssafy.card.JWT.JwtUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/auth")
public class AuthController {

    private final JwtUtil jwtUtil;
    private final AuthService authService;

    @PostMapping("/mydata")
    public JwtTokenResponseDto issueMyDataToken(@RequestBody MyDataRequestDto dto){

        log.debug("마이데이터 토큰 발급 : " + dto.getName());
        return authService.issueMyDataToken(dto);
    }

    @PostMapping("/pay")
    public JwtTokenResponseDto issuePayToken(@RequestBody PayRequestDto dto){

        log.debug("결제 토큰 발급 : " + dto.getCardNumber());
        return authService.issuePayToken(dto);
    }

    // redis에 refresh 저장해놓고 재발급 때 마다 불러와서 access 새로 발급해주기
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response){

        //get refresh token
        String refresh = null;

        return null;

    }
}
