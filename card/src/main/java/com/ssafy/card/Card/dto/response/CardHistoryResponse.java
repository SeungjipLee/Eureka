package com.ssafy.card.Card.dto.response;


import com.ssafy.card.Card.entity.CardHistoryEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardHistoryResponse {

    int cardHistoryId;
    int userCardId;
    String approvedNum;
    LocalDateTime approvedDateTime;
    int status;
    int payType;
    LocalDateTime transDateTime;
    String merchantName;
    String merchantRegNo;
    int approvedAmt;
    int modifiedAmt;
    int totalInstallCnt;
    int largeCategoryId;
    int smallCategoryId;

    public CardHistoryResponse(CardHistoryEntity entity){
        this.cardHistoryId = entity.getCardHistoryId();
        this.userCardId = entity.getUserCardId();
        this.approvedNum = entity.getApprovedNum();
        this.approvedDateTime = entity.getApprovedDateTime();
        this.status = entity.getStatus();
        this.payType = entity.getPayType();
        this.transDateTime = entity.getTransDateTime();
        this.merchantName = entity.getMerchantName();
        this.merchantRegNo = entity.getMerchantRegNo();
        this.approvedAmt = entity.getApprovedAmt();
        this.modifiedAmt = entity.getModifiedAmt();
        this.totalInstallCnt = entity.getTotalInstallCnt();
        this.largeCategoryId = entity.getLargeCategoryId();
        this.smallCategoryId = entity.getSmallCategoryId();
    }
}
