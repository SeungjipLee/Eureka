package com.ssafy.eureka.domain.pay.dto;

import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@RedisHash(value = "payInfo", timeToLive = 3 * 1000L)
public class PayInfo {
    @Id
    private String orderId;

    @NotNull
    private String userId;

    @NotNull
    private String storeName;

    @NotNull
    private String storeId;

    @NotNull
    private String orderName;

    @NotNull
    private int totalAmount;

    @NotNull
    private int vat;

    @NotNull
    private LocalDateTime requestedAt;

    private String redirectUrl;

    public PayInfo(String userId, RequestPayRequest requestPayRequest) {
        this.userId = userId;
        this.orderId = requestPayRequest.getOrderId();
        this.storeName = requestPayRequest.getStoreName();
        this.storeId = requestPayRequest.getStoreId();
        this.orderName = requestPayRequest.getOrderName();
        this.totalAmount = requestPayRequest.getTotalAmount();
        this.vat = requestPayRequest.getVat();
        this.requestedAt = requestPayRequest.getRequestedAt();
        this.redirectUrl = requestPayRequest.getRedirectUrl();
    }
}
