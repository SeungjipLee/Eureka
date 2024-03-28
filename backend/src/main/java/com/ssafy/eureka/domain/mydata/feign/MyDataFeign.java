package com.ssafy.eureka.domain.mydata.feign;

import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.domain.mydata.dto.request.MyDataCardHistoryRequest;
import com.ssafy.eureka.domain.mydata.dto.request.MyDataTokenRequest;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataTokenResponse;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataUserCardResponse;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import java.util.List;

//@FeignClient(name="myDataFeign", url="${feign.client.baseurl.myDataFeign}")
@FeignClient(name="myDataFeign", url="${feign.client.baseurl.myDataFeign}")
public interface MyDataFeign {
    @PostMapping(path = "/auth/mydata")
    public MyDataApiResponse<MyDataTokenResponse> requestToken(
        @RequestBody MyDataTokenRequest myDataTokenRequest);

    @PostMapping(path = "/user/list")
    public MyDataApiResponse<MyDataUserCardResponse> searchUserCard(
        @RequestHeader("Authorization") String accessToken,
        @RequestParam("cardCompanyId") int cardCompanyId);

    @GetMapping(path = "/card/history")
    public MyDataApiResponse<List<MyDataCardHistoryResponse.MyDataCardHistory>> searchCardPayList(
        @RequestHeader("Authorization") String accessToken,
        @RequestParam("cardIdentifier") String cardIdentifier,
        @RequestParam("yyyymm") String yyyymm);
//        @RequestBody MyDataCardHistoryRequest myDataCardHistoryRequest);
}
