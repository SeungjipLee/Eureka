package com.ssafy.eureka.domain.payment.dto.request;

import com.ssafy.eureka.domain.pay.dto.PayInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayRequest {
    private String cardIdentifier;

    private String token;

    private String storeName;

    private String storeRegNo;

    private int totalAmount;

    private int totalInstallCnt;

    private int largeCategoryId;

    private Integer smallCategoryId;

    public PayRequest(String cardIdentifier, String token, PayInfo payInfo) {
        this.cardIdentifier = cardIdentifier;
        this.token = token;

        this.storeName = payInfo.getStoreName();
        this.storeRegNo = payInfo.getStoreRegNo();

        this.totalAmount = payInfo.getTotalAmount();
        this.totalInstallCnt = payInfo.getTotalInstallCnt();

        this.largeCategoryId = payInfo.getLargeCategoryId();
        this.smallCategoryId = payInfo.getSmallCategoryId();
    }
}
