package com.ssafy.eureka.domain.user.controller;

import com.ssafy.eureka.common.response.ApiResponse;
import com.ssafy.eureka.domain.auth.jwt.JwtTokenProvider;
import com.ssafy.eureka.domain.user.dto.request.CheckUserRequest;
import com.ssafy.eureka.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "자격 및 비밀번호 관련 API", description = "토큰 재발급, 비밀번호 확인, 비밀번호 변경")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;
    @SecurityRequirement(name = "JWT Auth")
    @Operation(summary = "AccessToken 재발급", description = "Refresh Token으로 AccesToken 재발급")
    @GetMapping("/reissue")
    public ApiResponse<?> reissueAccessToken(HttpServletRequest request) {
        log.debug("AccessToken 재발급 요청");
        return ApiResponse.ok("Token 재발급 성공", userService.reissueToken(request));
    }

    @SecurityRequirement(name = "JWT Auth")
    @Operation(summary = "비밀번호 확인", description = "비밀번호 확인하기")
    @PostMapping("/user")
    public ApiResponse<?> checkPassword(@AuthenticationPrincipal UserDetails userDetails,
        @RequestBody String password) {
        log.debug("비밀번호 확인, userName : " + userDetails.getUsername());
        userService.checkPassword(userDetails, password);
        return ApiResponse.ok("비밀번호 확인 성공");
    }

    @SecurityRequirement(name = "JWT Auth")
    @Operation(summary = "비밀번호 변경", description = "비밀번호 변경하기")
    @PutMapping("/user")
    public ApiResponse<?> updatePassword(@AuthenticationPrincipal UserDetails userDetails,
        @RequestBody String password) {
        log.debug("비밀번호 변경, userId : " + userDetails.getUsername());
        userService.updatePassword(userDetails, password);
        return ApiResponse.ok("비밀번호 변경 성공");
    }

    @SecurityRequirement(name = "JWT Auth")
    @Operation(summary = "회원 탈퇴", description = "회원 탈퇴하기")
    @DeleteMapping("/user")
    public ApiResponse<?> resignUser(@AuthenticationPrincipal UserDetails userDetails) {
        log.debug("회원 탈퇴, userId : " + userDetails.getUsername());
        userService.resignUser(userDetails);
        return ApiResponse.ok("회원 탈퇴 성공");
    }

}
