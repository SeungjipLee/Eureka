package com.ssafy.eureka.domain.mydata.dto.response;

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
    public static class MyDataCardHistory {

    }
}
