package com.ssafy.eureka.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class UserDataTokenResponse {
    private String refreshToken;
    private String accessToken;

    private UserData userData;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class UserData{
        private String userName;
        private String userBirth;
        private String phoneNumber;
    }
}
