package com.ssafy.eureka.domain.pay.controller;


import com.ssafy.eureka.domain.pay.dto.request.AprrovePayRequest;
import com.ssafy.eureka.domain.pay.dto.request.RequestPayRequest;
import com.ssafy.eureka.domain.pay.service.PayService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Tag(name = "결제 로직 API", description = "결제 요청 1(결제 정보 -> 카드 추천), 결제 요청 2(카드 선택 -> 결제 진행)")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/pay")
public class PayController {

    private final PayService payService;

    @Operation(summary = "결제 요청(결제 정보)")
    @PostMapping("/request")
    public ResponseEntity<?> requestPay(@AuthenticationPrincipal UserDetails userDetails, @RequestBody RequestPayRequest requestPayRequest) {
        log.debug("결제 요청, userId : " + userDetails.getUsername() + "결제 번호 : " + requestPayRequest.getOrderId());
        log.debug("상점 정보 : " + requestPayRequest.getStoreName() + " / " + requestPayRequest.getStoreRegNo());
        return ResponseEntity.ok(payService.requestPay(userDetails.getUsername(), requestPayRequest));
    }

    @Operation(summary = "결제 진행(카드 정보)")
    @PostMapping("/approve")
    public ResponseEntity<?> approvePay(@AuthenticationPrincipal UserDetails userDetails, @RequestBody AprrovePayRequest aprrovePayRequest) {
        log.debug("결제 승인 요청, userId : " + userDetails.getUsername() + "결제 번호 : " + aprrovePayRequest.getOrderId());
        payService.approvePay(userDetails.getUsername(), aprrovePayRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "페이 결제 내역")
    @GetMapping("/history")
    public ResponseEntity<?> payHistory(@AuthenticationPrincipal UserDetails userDetails,
                                        @RequestParam String yyyymm){
        log.debug("페이 결제 내역, userId : "+ userDetails.getUsername());
        return ResponseEntity.ok(payService.payHistory(userDetails.getUsername(),yyyymm));
    }
}
