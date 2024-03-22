package com.ssafy.eureka.domain.mydata.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MyDataCardHistoryRequest {
    private String cardIdentifier;
    private String yyyymm;
}
