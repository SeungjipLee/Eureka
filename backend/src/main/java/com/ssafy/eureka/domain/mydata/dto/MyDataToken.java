package com.ssafy.eureka.domain.mydata.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@RedisHash(value = "maDataToekn", timeToLive = 365 * 24 * 60 * 60 * 1000L)
public class MyDataToken {
    @Id
    private String userId;
    private String accessToken;
    private String refreshToken;
}
