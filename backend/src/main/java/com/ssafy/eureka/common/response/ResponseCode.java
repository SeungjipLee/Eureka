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
    USER_PASSWORD_ERROR(HttpServletResponse.SC_BAD_REQUEST, "비밀번호 오류"),
    USER_BIRTH_ERROR(HttpServletResponse.SC_NOT_FOUND, "주민등록번호 오류"),

    USER_CARD_NOT_FOUND(HttpServletResponse.SC_NOT_FOUND, "카드를 찾을 수 없음"),
    CARD_NOT_FOUND(HttpServletResponse.SC_NOT_FOUND, "존재하지 않는 카드"),

    // 인증 문자 에러
    PASSWORD_ERROR(HttpServletResponse.SC_BAD_REQUEST, "인증번호 오류"),

    //
    AES_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "비밀번호 암호화 오류"),

    REFRESH_TOKEN_ERROR(HttpServletResponse.SC_UNAUTHORIZED, "리프레시 토큰 오류"),
    ACCESS_TOKEN_EXPIRED(HttpServletResponse.SC_UNAUTHORIZED, "액세스 토큰 만료"),
    USER_ALREADY_EXSIST(HttpServletResponse.SC_CONFLICT, "이미 가입된 회원"),


    MY_DATA_TOKEN_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "마이데이터 토큰 에러"),
    PAY_TOKEN_ERROR(HttpServletResponse.SC_BAD_REQUEST,"카드사 토큰 발급 에러"),
    STORE_NOT_FOUND(HttpServletResponse.SC_BAD_REQUEST, "제휴 가맹점이 아닙니다."),
    PAY_INFO_NOT_FOUND(HttpServletResponse.SC_NOT_FOUND, "결제 정보를 찾을 수 없음"),
    PAY_APRROVE_ERROR(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, "카드 승인 오류"),

    INVALID_YEAR_MONTH(HttpServletResponse.SC_BAD_REQUEST, "날짜 형식 오류"),
    ;

    private final int code;
    private final String message;
}
