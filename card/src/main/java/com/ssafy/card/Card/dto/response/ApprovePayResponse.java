package com.ssafy.card.Card.dto.response;

import com.ssafy.card.Card.entity.CardHistoryEntity;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@NotNull
@AllArgsConstructor
public class ApprovePayResponse {
    private int userCardId;

    private int status;

    private int payType;

    private String approvedNum;

    private LocalDateTime approvedDateTime;

    private int approvedAmt;

    private LocalDateTime transDateTime;

    private Integer modifiedAmt;

    private String merchantName;

    private String merchantRegNo;

    private Integer totalInstallCnt;

    private int largeCategoryId;

    private Integer smallCategoryId;

    public ApprovePayResponse(CardHistoryEntity cardHistory) {
        this.status = cardHistory.getStatus();
        this.payType = cardHistory.getPayType();
        this.approvedNum = cardHistory.getApprovedNum();
        this.approvedDateTime = cardHistory.getApprovedDateTime();
        this.approvedAmt = cardHistory.getApprovedAmt();
        this.transDateTime = cardHistory.getTransDateTime();
        this.modifiedAmt = cardHistory.getModifiedAmt();
        this.merchantName = cardHistory.getMerchantName();
        this.merchantRegNo = cardHistory.getMerchantRegNo();
        this.totalInstallCnt = cardHistory.getTotalInstallCnt();
        this.largeCategoryId = cardHistory.getLargeCategoryId();
        this.smallCategoryId = cardHistory.getSmallCategoryId();
    }
}
