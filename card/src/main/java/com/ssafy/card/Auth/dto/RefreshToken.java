package com.ssafy.card.Auth.dto;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import org.springframework.data.annotation.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@RedisHash(value = "refreshToken", timeToLive = 365 * 24 * 60 * 60 * 1000L)
public class RefreshToken {

    @Id
    private String userId;
    private String refreshToken;
}
