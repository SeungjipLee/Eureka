package com.ssafy.card.common;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
public class ApiResponse<T> {

    private String message;
    private int status;
    private T data;

    @Builder
    public ApiResponse(String message, int status, T data){
        this.message = message;
        this.status = status;
        this.data = data;
    }
}
