package com.ssafy.eureka.domain.payment.dto.response;

import java.time.LocalDateTime;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayResponse {
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
}
