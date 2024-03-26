package com.ssafy.card.Card.dto.response;


import com.ssafy.card.Card.entity.CardHistoryEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;



@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardHistoryResponse {

    int cardHistoryId;
    int userCardId; // 유저 카드 PK
    String approvedNum;
    LocalDateTime approvedDtime;
    int status;
    int payType;
    LocalDateTime transDtime;
    String merchantName;
    String merchantRegno;
    int approvedAmt;
    int modifiedAmt;
    int totalInstallCnt;
    String categoryName;

    public CardHistoryResponse(CardHistoryEntity entity){
        this.cardHistoryId = entity.getCardHistoryId();
        this.userCardId = entity.getUserCardId();
        this.approvedNum = entity.getApprovedNum();
        this.approvedDtime = entity.getApprovedDtime();
        this.status = entity.getStatus();
        this.payType = entity.getPayType();
        this.transDtime = entity.getTransDtime();
        this.merchantName = entity.getMerchantName();
        this.merchantRegno = entity.getMerchantRegno();
        this.approvedAmt = entity.getApprovedAmt();
        this.modifiedAmt = entity.getModifiedAmt();
        this.totalInstallCnt = entity.getTotalInstallCnt();
        this.categoryName = entity.getCategoryName();
    }
}
