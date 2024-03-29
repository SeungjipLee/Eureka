package com.ssafy.eureka.domain.pay.service;


import com.ssafy.eureka.domain.pay.dto.PayHistoryEntity;
import com.ssafy.eureka.domain.pay.dto.request.AprrovePayRequest;
import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import com.ssafy.eureka.domain.pay.dto.response.AprrovePayResponse;
import com.ssafy.eureka.domain.pay.dto.response.CardRecommendResponse;
import com.ssafy.eureka.domain.pay.dto.response.PayHistoryResponse;
import com.ssafy.eureka.domain.pay.dto.response.RequestPayResponse;

public interface PayService {
    CardRecommendResponse requestPay(String userId, RequestPayRequest requestPayRequest);

    AprrovePayResponse approvePay(String userId, AprrovePayRequest aprrovePayRequest);

    PayHistoryResponse payHistory(String userId, String yyyymm);
}
