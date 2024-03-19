package com.ssafy.eureka.domain.user.dto.request;

import lombok.Getter;

@Getter
public class LoginRequest {
    int userId;
    String password;
}
