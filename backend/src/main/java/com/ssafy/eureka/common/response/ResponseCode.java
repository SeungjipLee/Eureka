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
    USER_NOT_FOUND(HttpServletResponse.SC_NOT_FOUND, "유저가 존재하지 않습니다"),


    ;

    private final int code;
    private final String message;
}
