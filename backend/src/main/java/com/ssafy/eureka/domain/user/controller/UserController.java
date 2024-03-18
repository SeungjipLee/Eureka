package com.ssafy.eureka.domain.user.controller;

import com.ssafy.eureka.common.response.ApiResponse;
import com.ssafy.eureka.domain.user.dto.request.CheckUserRequest;
import com.ssafy.eureka.domain.user.dto.request.LoginRequest;
import com.ssafy.eureka.domain.user.dto.request.SignUpRequest;
import com.ssafy.eureka.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
@Slf4j
@Tag(name = "회원관리 API", description = "회원확인, 회원가입, 로그인")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/user")
public class UserController {
    private final UserService userService;

    @Operation(summary = "인증 문자 전송")
    @PostMapping("/send")
    public ApiResponse<?> sendMessage(@RequestBody CheckUserRequest checkUserRequest) {
        log.debug("인증 문자 전송, userName : " + checkUserRequest.getUserName());
        userService.sendMessage(checkUserRequest);
        return ApiResponse.ok("문자 전송 성공");
    }

    @Operation(summary = "회원확인")
    @PostMapping("/check")
    public ApiResponse<?> checkUser(@RequestBody CheckUserRequest checkUserRequest) {
        log.debug("회원확인, userName : " + checkUserRequest.getUserName());
        return ApiResponse.ok("회원확인 성공", userService.checkUser(checkUserRequest));
    }

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ApiResponse<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        log.debug("회원가입, userName : " + signUpRequest.getUserName());
        return ApiResponse.ok("회원가입 성공", userService.signUp(signUpRequest));
    }

    @Operation(summary =  "로그인")
    @PostMapping("/login")
    public ApiResponse<?> signUp(@RequestBody LoginRequest loginRequest) {
        log.debug("로그인, userId : " + loginRequest.getUserId());
        return ApiResponse.ok("로그인 성공", userService.login(loginRequest));
    }

    @Operation(summary = "비밀번호 확인", description = "비밀번호 확인하기")
    @GetMapping("/check")
    public ApiResponse<?> checkPassword(@RequestBody CheckUserRequest checkUserRequest) {
        log.debug("비밀번호 확인, userName : " + checkUserRequest.getUserName());
        return ApiResponse.ok("비밀번호 확인 성공", userService.checkPassword(checkUserRequest));
    }
}
