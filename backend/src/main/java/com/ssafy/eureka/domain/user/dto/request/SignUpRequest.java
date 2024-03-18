package com.ssafy.eureka.domain.user.dto.request;

import java.time.LocalDate;
import lombok.Getter;

@Getter
public class SignUpRequest {
    private String userName;
    private String userBirth;
    private char userGender;
    private String phoneNumber;
    private String password;
}
