package com.ssafy.eureka.domain.card.dto.response;

import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CardHistoryListResponse {

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

    public CardHistoryListResponse(MyDataCardHistoryResponse myDataCardHistoryResponse){

        for(int i=0; i<myDataCardHistoryResponse.getMyDataCardHistoryList().size(); i++){

        this.cardHistoryId = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getCardHistoryId();
        this.userCardId = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getUserCardId();
        this.approvedNum = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getApprovedNum();
        this.status = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getStatus();
        this.payType = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getPayType();
        this.transDateTime = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getTransDateTime();
        this.merchantName = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getMerchantName();
        this.merchantRegNo = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getMerchantRegNo();
        this.approvedAmt = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getApprovedAmt();
        this.modifiedAmt = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getModifiedAmt();
        this.totalInstallCnt = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getTotalInstallCnt();

        }
    }

}
