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

    private int cardHistoryId;
    private    int userCardId;
    private    String approvedNum;
    private  int status;
    private int payType;
    private LocalDateTime transDtime;
    private  String merchantName;
    private  String merchantRegno;
    private  int approvedAmt;
    private  int modifiedAmt;
    private int totalInstallCnt;
    private String categoryName;

    public CardHistoryListResponse(MyDataCardHistoryResponse myDataCardHistoryResponse){

        for(int i=0; i<myDataCardHistoryResponse.getMyDataCardHistoryList().size(); i++){

        this.cardHistoryId = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getCardHistoryId();
        this.userCardId = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getUserCardId();
        this.approvedNum = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getApprovedNum();
        this.status = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getStatus();
        this.payType = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getPayType();
        this.transDtime = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getTransDtime();
        this.merchantName = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getMerchantName();
        this.merchantRegno = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getMerchantRegno();
        this.approvedAmt = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getApprovedAmt();
        this.modifiedAmt = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getModifiedAmt();
        this.totalInstallCnt = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getTotalInstallCnt();
        this.categoryName = myDataCardHistoryResponse.getMyDataCardHistoryList().get(i).getCategoryName();

        }
    }

}
