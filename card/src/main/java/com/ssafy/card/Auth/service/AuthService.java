package com.ssafy.card.Auth.service;

import com.ssafy.card.Auth.dto.request.MyDataRequestDto;
import com.ssafy.card.Auth.dto.request.PayRequestDto;
import com.ssafy.card.Auth.dto.response.JwtTokenResponseDto;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {

//    public ApiResponse<?> issueMyDataToken(MyDataRequestDto dto);
    public JwtTokenResponseDto issueMyDataToken(MyDataRequestDto dto);
    public JwtTokenResponseDto issuePayToken(PayRequestDto dto);
}
