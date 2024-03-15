package com.ssafy.eureka.domain.user.dto;

import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 60 * 60 * 1000L)
public class RefreshToken {
    @Id
    private String userId;
    private String refreshToken;
}
