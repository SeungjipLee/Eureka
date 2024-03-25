package com.ssafy.eureka.domain.pay.service;

import com.ssafy.eureka.domain.pay.dto.request.AprrovePayRequest;
import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import com.ssafy.eureka.domain.pay.dto.response.AprrovePayResponse;
import com.ssafy.eureka.domain.pay.dto.response.RequestPayResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PayServiceImpl implements PayService{

    @Override
    public RequestPayResponse requestPay(String userId, RequestPayRequest requestPayRequest) {

        // redis 사용.

        // 결제 정보를 redis에 저장한다.

        // 카드 추천을 진행한다.

        // 결과를 반환한다.

        return null;
    }

    @Override
    public AprrovePayResponse approvePay(String userId, AprrovePayRequest aprrovePayRequest) {

        // 카드 정보, 결제 정보 받음.

        // redis 에서 결제 정보 가져옴

        // card에 결제 요청

        // 결제 내역 저장

        // 결제 결과 반환

        return null;
    }
}
