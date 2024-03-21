package com.ssafy.eureka.domain.user.dto.request;

import lombok.Getter;

@Getter
public class SendMessageRequest {
    String userName;
    String userBirth;
    char userGender;
    String phoneNumber;
}
