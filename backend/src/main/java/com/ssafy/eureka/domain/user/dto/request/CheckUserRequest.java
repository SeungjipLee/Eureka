package com.ssafy.eureka.domain.user.dto.request;

import java.time.LocalDate;
import lombok.Getter;

@Getter
public class CheckUserRequest {
    String userName;
    String userBirth;
    char userGender;
    String phoneNumber;
    String authNumber;
}
