package com.ssafy.eureka.domain.pay.dto.request;

import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class RequestPayRequest {
    private String storeCode;

    private String storeId;

    private String orderId;

    private String orderName;

    private Long totalAmount;

    private Long vat;

    private LocalDateTime requestedAt;

    private String redirectUrl;
}