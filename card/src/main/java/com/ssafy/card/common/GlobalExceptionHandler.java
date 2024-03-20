package com.ssafy.card.common;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(Exception.class)
    public ApiResponse<?> handleException(Exception e){
        return new ApiResponse<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR.value(), null);
    }

    @ExceptionHandler(CustomException.class)
    public ApiResponse<?> handleCustomException(CustomException e){
        return new ApiResponse<>(e.getMessage(), e.getStatus(), null);
    }

}
