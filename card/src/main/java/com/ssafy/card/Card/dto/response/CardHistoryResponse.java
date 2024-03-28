package com.ssafy.card.Card.dto.response;

import com.ssafy.card.Card.entity.CardHistoryEntity;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardHistoryResponse {
    List<MyDataCardHistory> myDataCardHistoryList;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MyDataCardHistory {
        int cardHistoryId;
        int userCardId;
        int status;
        int payType;
        String approvedNum;
        LocalDateTime approvedDateTime;
        int approvedAmt;
        LocalDateTime transDateTime;
        Integer modifiedAmt;
        String merchantName;
        String merchantRegNo;
        Integer totalInstallCnt;
        int largeCategoryId;
        Integer smallCategoryId;

        public MyDataCardHistory(CardHistoryEntity history) {
            this.cardHistoryId = history.getCardHistoryId();
            this.userCardId = history.getUserCardId();
            this.status = history.getStatus();
            this.payType = history.getPayType();
            this.approvedNum = history.getApprovedNum();
            this.approvedDateTime = history.getApprovedDateTime();
            this.approvedAmt = history.getApprovedAmt();
            this.transDateTime = history.getTransDateTime();
            this.modifiedAmt = history.getModifiedAmt();
            this.merchantName = history.getMerchantName();
            this.merchantRegNo = history.getMerchantRegNo();
            this.totalInstallCnt = history.getTotalInstallCnt();
            this.largeCategoryId = history.getLargeCategoryId();
            this.smallCategoryId = history.getSmallCategoryId();
        }
    }
}
