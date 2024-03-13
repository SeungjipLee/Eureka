package com.ssafy.eureka.common.response;

import jakarta.servlet.http.HttpServletResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum ResponseHeader {

    SUCCESS(HttpServletResponse.SC_OK, "success"),
    USER_NOT_FOUND(HttpServletResponse.SC_NOT_FOUND, "유저가 존재하지 않습니다"),;

    private final int code;
    private final String message;
}
