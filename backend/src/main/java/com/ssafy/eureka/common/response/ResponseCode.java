package com.ssafy.eureka.common.response;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@AllArgsConstructor
@Getter
public enum ResponseCode {

    SUCCESS(HttpStatus.OK.value(), "success"),

    // 유저
    USER_NOT_FOUND(HttpServletResponse.SC_NOT_FOUND, "유저가 존재하지 않음"),
    USER_PASSWORD_ERROR(HttpServletResponse.SC_UNAUTHORIZED, "비밀번호 오류"),
    USER_BIRTH_ERROR(HttpServletResponse.SC_NOT_FOUND, "주민등록번호 오류"),

    // 인증 문자 에러
    PASSWORD_ERROR(HttpServletResponse.SC_UNAUTHORIZED, "인증번호 오류"),

    //
    AES_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "비밀번호 암호화 오류"),

    REFRESHTOKEN_ERROR(HttpServletResponse.SC_NOT_FOUND, "리프레시 토큰 오류"),
    USER_ALREADY_EXSIST(HttpServletResponse.SC_CONFLICT, "이미 가입된 회원")
    ;

    private final int code;
    private final String message;
}
