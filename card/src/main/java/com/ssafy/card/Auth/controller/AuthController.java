package com.ssafy.card.Auth.controller;

import com.ssafy.card.Auth.dto.request.MyDataRequestDto;
//import com.ssafy.card.Auth.service.AuthService;
import com.ssafy.card.Auth.dto.request.PayRequestDto;
import com.ssafy.card.Auth.dto.response.JwtTokenResponseDto;
import com.ssafy.card.Auth.service.AuthService;
import com.ssafy.card.JWT.JwtUtil;
import com.ssafy.card.common.ApiResponse;
import com.ssafy.card.common.ResponseCode;
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

    private final AuthService authService;

    @PostMapping("/mydata")
    public ApiResponse issueMyDataToken(@RequestBody MyDataRequestDto myDataRequestDto){
        log.debug("마이데이터 토큰 발급 : " + myDataRequestDto.getName());
         JwtTokenResponseDto result =  authService.issueMyDataToken(myDataRequestDto);

        return new ApiResponse(ResponseCode.SUCCESS.getMessage(), ResponseCode.SUCCESS.getStatus(), result);
    }

    @PostMapping("/pay")
    public ApiResponse issuePayToken(@RequestBody PayRequestDto dto){
        log.debug("결제 토큰 발급 : " + dto.getCardNumber());
        JwtTokenResponseDto result =  authService.issuePayToken(dto);
        return new ApiResponse(ResponseCode.SUCCESS.getMessage(), ResponseCode.SUCCESS.getStatus(), result);
    }

    // redis에 refresh 저장해놓고 재발급 때 마다 불러와서 access 새로 발급해주기
    @PostMapping("/reissue")
    public ResponseEntity<?> reissue(HttpServletRequest request, HttpServletResponse response){

        //get refresh token
        String refresh = null;

        return null;
    }
}
