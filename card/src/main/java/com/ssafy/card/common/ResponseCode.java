package com.ssafy.card.common;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ResponseCode {
    SUCCESS(HttpStatus.OK.value(), "Success"),
    INTERNAL_SERVER_ERROR(500, "서버에 문제가 생겼습니다."),

    // 유저 / 토큰
    USER_NOT_FOUND(404, "해당 유저를 찾을 수 없습니다."),
    INVALID_USER_NAME(500, "존재하지 않는 유저 Name"),
    INVALID_USER_BIRTH(500, "존재하지 않는 유저 Birth"),
    INVALID_REFRESH_TOKEN(500, "유효하지 않은 RefreshToken."),
    INVALID_ACCESS_TOKEN(500, "유효하지 않은 AccessToken"),

    // 카드
    NOT_FOUND_CARD(404, "존재하지 않는 카드"),

    NOT_EXPIRED_TOKEN_YET(500, "Not expired token yet."),
    FAIL_TOKEN_GENERATION(500, "Failed to generate Token."),

    CONFLICT_RESOURCE(409, "중복된 값이 있습니다. 다시 입력해주세요"),

    USER_CARD_NOT_FOUND(404, "유저 카드를 찾을 수 없음.");

    private int status;
    private String message;
}
