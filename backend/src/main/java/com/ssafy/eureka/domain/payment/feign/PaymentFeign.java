package com.ssafy.eureka.domain.payment.feign;

import com.ssafy.eureka.domain.payment.dto.request.PayRequest;
import com.ssafy.eureka.domain.payment.dto.request.PayTokenRequest;
import com.ssafy.eureka.domain.payment.dto.response.PayResponse;
import com.ssafy.eureka.domain.payment.dto.response.PayTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name="paymentFeign", url="https://j10e101.p.ssafy.io/card")
//@FeignClient(name="paymentFeign", url="http://localhost:8001/card")
public interface PaymentFeign {

    @PostMapping(path = "/auth/pay")
    public PayTokenResponse requestPayToken(
        @RequestHeader("Authorization") String accessToken,
        @RequestBody PayTokenRequest payTokenRequest);

    @PostMapping(path = "/user/pay")
    public PayResponse requestPay(
        @RequestHeader("Authorization") String accessToken,
        @RequestBody PayRequest payRequest);
}
