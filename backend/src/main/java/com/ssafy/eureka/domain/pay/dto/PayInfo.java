package com.ssafy.eureka.domain.pay.dto;

import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@RedisHash(value = "payInfo", timeToLive = 60 * 1000L)
public class PayInfo {
    @Id
    private String orderId;

    @NotNull
    private String userId;

    @NotNull
    private String storeName;

    @NotNull
    private String storeRegNo;

    @NotNull
    private String orderName;

    @NotNull
    private int totalAmount;

    @NotNull
    private int vat;

    @NotNull
    private int totalInstallCnt;

    @NotNull
    private LocalDateTime requestedAt;

    private String redirectUrl;

    @NotNull
    private int largeCategoryId;

    private Integer smallCategoryId;

    private int recommendCardId;

    private int recommendDiscount;

    public PayInfo(String userId, RequestPayRequest requestPayRequest, int recommendCardId, int recommendDiscount) {
        this.userId = userId;
        this.orderId = requestPayRequest.getOrderId();
        this.storeName = requestPayRequest.getStoreName();
        this.storeRegNo = requestPayRequest.getStoreRegNo();
        this.orderName = requestPayRequest.getOrderName();
        this.totalAmount = requestPayRequest.getTotalAmount();
        this.vat = requestPayRequest.getVat();
        this.totalInstallCnt = requestPayRequest.getTotalInstallCnt();
        this.requestedAt = requestPayRequest.getRequestedAt();
        this.redirectUrl = requestPayRequest.getRedirectUrl();
        this.largeCategoryId = requestPayRequest.getLargeCategoryId();
        this.smallCategoryId = requestPayRequest.getSmallCategoryId();
        this.recommendCardId = recommendCardId;
        this.recommendDiscount = recommendDiscount;
    }
}
