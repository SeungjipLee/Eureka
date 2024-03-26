package com.ssafy.eureka.domain.user.controller;

import com.ssafy.eureka.domain.user.dto.request.CheckUserRequest;
import com.ssafy.eureka.domain.user.dto.request.LoginRequest;
import com.ssafy.eureka.domain.user.dto.request.SendMessageRequest;
import com.ssafy.eureka.domain.user.dto.request.SignUpRequest;
import com.ssafy.eureka.domain.user.dto.response.JwtTokenResponse;
import com.ssafy.eureka.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<?> sendMessage(@RequestBody SendMessageRequest sendMessageRequest) {
        log.debug("인증 문자 전송, userName : " + sendMessageRequest.getUserName());
        userService.sendMessage(sendMessageRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "회원확인")
    @PostMapping("/check")
    public ResponseEntity<?> checkUser(@RequestBody CheckUserRequest checkUserRequest) {
        log.debug("회원확인, userName : " + checkUserRequest.getUserName());
        JwtTokenResponse res = userService.checkUser(checkUserRequest);
        if(res == null){
            return ResponseEntity.ok().build();
        }else{
            return ResponseEntity.ok(res);
        }
    }

    @Operation(summary = "회원가입")
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody SignUpRequest signUpRequest) {
        log.debug("회원가입, userName : " + signUpRequest.getUserName());
        return ResponseEntity.ok(userService.signUp(signUpRequest));
    }

    @Operation(summary =  "로그인")
    @PostMapping("/login")
    public ResponseEntity<?> signUp(@RequestBody LoginRequest loginRequest) {
        log.debug("로그인, userId : " + loginRequest.getUserId());
        return ResponseEntity.ok(userService.login(loginRequest));
    }
}
