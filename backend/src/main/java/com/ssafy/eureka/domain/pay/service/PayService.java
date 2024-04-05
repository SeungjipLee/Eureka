package com.ssafy.eureka.domain.pay.service;


import com.ssafy.eureka.domain.pay.dto.request.AprrovePayRequest;
import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import com.ssafy.eureka.domain.pay.dto.response.CardRecommendResponse;
import com.ssafy.eureka.domain.pay.dto.response.PayHistoryResponse;

public interface PayService {
    CardRecommendResponse requestPay(String userId, RequestPayRequest requestPayRequest);

    void approvePay(String userId, AprrovePayRequest aprrovePayRequest);

    PayHistoryResponse payHistory(String userId, String yyyymm);
}
