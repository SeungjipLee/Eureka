package com.ssafy.eureka.domain.mydata.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyDataTokenResponse {
    private String grantType;
    private String accessToken;
    private String refreshToken;
}
