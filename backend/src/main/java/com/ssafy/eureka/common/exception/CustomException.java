package com.ssafy.eureka.common.exception;

import com.ssafy.eureka.common.response.ResponseCode;
import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{
    private final int code;
    private final String message;

    public CustomException(ResponseCode responseHeader) {
        super(responseHeader.getMessage());
        this.code = responseHeader.getCode();
        this.message = responseHeader.getMessage();
    }
}
