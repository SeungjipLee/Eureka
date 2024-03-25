package com.ssafy.card.Auth.service;

import com.ssafy.card.Auth.dto.request.MyDataRequestDto;
import com.ssafy.card.Auth.dto.request.PayRequestDto;
import com.ssafy.card.Auth.dto.response.JwtTokenResponseDto;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Service;

@Service
public interface AuthService {
    public JwtTokenResponseDto issueMyDataToken(MyDataRequestDto myDataRequestDto);
    public JwtTokenResponseDto issuePayToken(PayRequestDto dto);
    public JwtTokenResponseDto reIssueToken(HttpServletRequest dto);
}
