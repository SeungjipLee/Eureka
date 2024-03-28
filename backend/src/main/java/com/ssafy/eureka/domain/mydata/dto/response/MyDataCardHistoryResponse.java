package com.ssafy.eureka.domain.mydata.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyDataCardHistoryResponse {
    List<MyDataCardHistory> myDataCardHistoryList;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class MyDataCardHistory {
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
    }
}
