package com.ssafy.card.User.controller;

import com.ssafy.card.User.dto.response.CardPayHistoryResponse;
import com.ssafy.card.User.dto.response.UserCardListResponse;
import com.ssafy.card.User.service.UserCardService;
import com.ssafy.card.common.ApiResponse;
import com.ssafy.card.common.ResponseCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/user")
public class UserController {

    private final UserCardService userCardService;

    @PostMapping("/list")
    public ApiResponse listUserCard(@AuthenticationPrincipal UserDetails userDetails,
                                    @RequestParam int cardCompanyId){
        log.debug("유저 카드 조회, phoneNumber : " + userDetails.getUsername());
        UserCardListResponse result = userCardService.listUserCard(userDetails.getUsername(), cardCompanyId);

        return new ApiResponse(ResponseCode.SUCCESS.getMessage(), ResponseCode.SUCCESS.getStatus(), result);
    }

    @PostMapping("/history")
    public ApiResponse listCardHistory(@AuthenticationPrincipal UserDetails userDetails,
                                       @RequestParam String cardIdentifier, @RequestParam String yyyymm){
        log.debug("카드 결제 내역 조회, phoneNumber : " + userDetails.getUsername());
        CardPayHistoryResponse result = userCardService.listCardHistory(userDetails.getUsername(), cardIdentifier, yyyymm);

        return new ApiResponse(ResponseCode.SUCCESS.getMessage(), ResponseCode.SUCCESS.getStatus(), result);
    }
}
