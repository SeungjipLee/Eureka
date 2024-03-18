package com.ssafy.eureka.domain.user.service;

import com.ssafy.eureka.domain.user.dto.request.CheckUserRequest;
import com.ssafy.eureka.domain.user.dto.request.LoginRequest;
import com.ssafy.eureka.domain.user.dto.request.SignUpRequest;
import com.ssafy.eureka.domain.user.dto.response.CheckUserRespnose;
import com.ssafy.eureka.domain.user.dto.response.JwtTokenResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    CheckUserRespnose checkUser(CheckUserRequest checkUserRequest);

    JwtTokenResponse signUp(SignUpRequest signUpRequest);

    JwtTokenResponse login(LoginRequest loginRequest);

    void updatePassword(UserDetails userDetails, String password);

    JwtTokenResponse checkPassword(CheckUserRequest checkUserRequest);

    void sendMessage(CheckUserRequest checkUserRequest);

    JwtTokenResponse reissueToken(HttpServletRequest request);
}
