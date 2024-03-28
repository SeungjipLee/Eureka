package com.ssafy.card.Card.dto.request;

import lombok.Getter;

@Getter
public class ApprovePayRequest {
    private String cardIdentifier;

    private String token;

    private String storeName;

    private String storeRegNo;

    private int totalAmount;

    private int totalInstallCnt;

    private int largeCategoryId;

    private Integer smallCategoryId;
}
