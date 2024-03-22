package com.ssafy.card.Auth.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JwtTokenResponseDto {

    private String grantType;
    private String accessToken;
    private String refreshToken;

}