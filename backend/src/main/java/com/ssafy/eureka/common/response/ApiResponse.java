package com.ssafy.eureka.common.response;

import java.io.Serializable;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ApiResponse<T> implements Serializable {

    private int status;
    private String message;
    private T data;

    public static <T> ApiResponse<T> ok(T data) {
        return new ApiResponse<>(ResponseCode.SUCCESS.getCode(), "success", data);
    }

    public static <T> ApiResponse<T> ok(String message) {
        return new ApiResponse<>(ResponseCode.SUCCESS.getCode(), message, null);
    }

    public static <T> ApiResponse<T> ok(String message, T data) {
        return new ApiResponse<>(ResponseCode.SUCCESS.getCode(), message, data);
    }

    public static <T> ApiResponse<T> error(int status, String message) {
        return new ApiResponse<>(status, message, null);
    }

}
