package com.ssafy.eureka.domain.payment.feign;

import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.domain.payment.dto.request.PayRequest;
import com.ssafy.eureka.domain.payment.dto.request.PayTokenRequest;
import com.ssafy.eureka.domain.payment.dto.response.PayResponse;
import com.ssafy.eureka.domain.payment.dto.response.PayTokenResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

@FeignClient(name="paymentFeign", url="${feign.client.baseurl.myDataFeign}")
public interface PaymentFeign {
    @PostMapping(path = "/auth/pay")
    public MyDataApiResponse<PayTokenResponse> requestPayToken(
        @RequestHeader("Authorization") String accessToken,
        @RequestBody PayTokenRequest payTokenRequest);

    @PostMapping(path = "/user/pay")
    public MyDataApiResponse<PayResponse> requestPay(
        @RequestHeader("Authorization") String accessToken,
        @RequestBody PayRequest payRequest);
}
