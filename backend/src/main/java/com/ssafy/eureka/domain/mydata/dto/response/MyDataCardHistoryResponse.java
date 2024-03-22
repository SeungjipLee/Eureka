package com.ssafy.eureka.domain.mydata.dto.response;

import java.time.LocalDateTime;
import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MyDataCardHistoryResponse {
    List<MyDataCardHistory> myDataCardHistoryList;

    @Getter
    public static class MyDataCardHistory {
        int cardHistoryId;
        int userCardId;
        String approvedNum;
        int status;
        int payType;
        LocalDateTime transDtime;
        String merchantName;
        String merchantRegno;
        int approvedAmt;
        int modifiedAmt;
        int totalInstallCnt;
        String categoryName;
    }
}
