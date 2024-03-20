package com.ssafy.card.common;

import lombok.Getter;

@Getter
public class CustomException extends RuntimeException{

    private final int status;
    private final String message;

    public CustomException(ErrorCode errorcode){
        super(errorcode.getMessage());
        this.status = errorcode.getStatus();
        this.message = errorcode.getMessage();
    }
}
