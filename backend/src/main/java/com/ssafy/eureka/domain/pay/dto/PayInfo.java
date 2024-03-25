package com.ssafy.eureka.domain.pay.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@Getter
@AllArgsConstructor
@RedisHash(value = "payInfo", timeToLive = 3 * 1000L)
public class PayInfo {
    @Id
    private String orderId;
}
