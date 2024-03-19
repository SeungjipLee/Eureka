package com.ssafy.eureka.domain.user.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 365 * 24 * 60 * 60 * 1000L)
public class RefreshToken {
    @Id
    private String userId;
    private String refreshToken;
}
