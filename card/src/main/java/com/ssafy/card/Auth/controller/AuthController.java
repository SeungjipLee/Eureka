package com.ssafy.card.Auth.controller;

import com.ssafy.card.Auth.dto.request.MyDataRequestDto;
//import com.ssafy.card.Auth.service.AuthService;
import com.ssafy.card.Auth.dto.request.PayRequestDto;
import com.ssafy.card.Auth.dto.response.JwtTokenResponseDto;
import com.ssafy.card.Auth.service.AuthService;
import com.ssafy.card.JWT.JwtUtil;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
}
