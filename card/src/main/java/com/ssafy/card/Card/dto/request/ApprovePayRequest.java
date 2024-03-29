package com.ssafy.card.Card.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
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
