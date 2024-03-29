package com.ssafy.eureka.domain.user.service;

import com.ssafy.eureka.domain.user.dto.request.CheckUserRequest;
import com.ssafy.eureka.domain.user.dto.request.LoginRequest;
import com.ssafy.eureka.domain.user.dto.request.SendMessageRequest;
import com.ssafy.eureka.domain.user.dto.request.SignUpRequest;
import com.ssafy.eureka.domain.user.dto.response.CheckUserRespnose;
import com.ssafy.eureka.domain.user.dto.response.JwtTokenResponse;
import com.ssafy.eureka.domain.user.dto.response.UserDataTokenResponse;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.security.core.userdetails.UserDetails;

public interface UserService {

    UserDataTokenResponse checkUser(CheckUserRequest checkUserRequest);

    UserDataTokenResponse signUp(SignUpRequest signUpRequest);

    UserDataTokenResponse login(LoginRequest loginRequest);

    void updatePassword(UserDetails userDetails, String password);

    void checkPassword(UserDetails userDetails, String password);

    void sendMessage(SendMessageRequest sendMessageRequest);

    JwtTokenResponse reissueToken(HttpServletRequest request);

    void resignUser(UserDetails userDetails);
}
