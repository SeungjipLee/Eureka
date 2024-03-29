package com.ssafy.eureka.domain.mydata.dto.response;

import java.math.BigInteger;
import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyDataCardHistoryResponse {
    private int monthTotalConsumption;

    private int monthTotalDiscount;

    private List<MyDataCardHistory> myDataCardHistoryList;

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
    }
}
