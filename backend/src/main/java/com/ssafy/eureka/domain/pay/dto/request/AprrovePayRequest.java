package com.ssafy.eureka.domain.pay.dto.request;

import lombok.Getter;

@Getter
public class AprrovePayRequest {
    private String orderId;
    private int userCardId;
}
