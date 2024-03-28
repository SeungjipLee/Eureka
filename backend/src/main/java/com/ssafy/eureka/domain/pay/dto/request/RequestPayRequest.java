package com.ssafy.eureka.domain.pay.dto.request;

import java.time.LocalDateTime;
import lombok.Getter;

@Getter
public class RequestPayRequest {
    private String storeId;

    private String storeName;

    private String orderId;

    private String orderName;

    private Integer largeCategoryId;

    private Integer smallCategoryId;

    private int totalAmount;

    private int vat;

    private int totalInstallCnt;

    private LocalDateTime requestedAt;

    private String redirectUrl;
}