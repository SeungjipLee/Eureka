package com.ssafy.card.Auth.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class JoinDto {

    private String phoneNumber;
    private String name;
    private String birth;
}
