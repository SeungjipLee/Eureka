package com.ssafy.eureka.domain.pay.service;


import com.ssafy.eureka.domain.pay.dto.request.AprrovePayRequest;
import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import com.ssafy.eureka.domain.pay.dto.response.AprrovePayResponse;
import com.ssafy.eureka.domain.pay.dto.response.RequestPayResponse;

public interface PayService {
    RequestPayResponse requestPay(String userId, RequestPayRequest requestPayRequest);

    AprrovePayResponse approvePay(String userId, AprrovePayRequest aprrovePayRequest);
}
