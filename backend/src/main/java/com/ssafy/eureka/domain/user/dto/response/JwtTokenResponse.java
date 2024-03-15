package com.ssafy.eureka.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class JwtTokenResponse {

    private String refreshToken;
    private String accessToken;
    private String tokenType = "Bearer";
}
