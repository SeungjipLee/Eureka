package com.ssafy.eureka.common.response;

import lombok.Getter;

@Getter
public class MyDataApiResponse <T> {
    private String message;
    private int status;
    private T data;
}
