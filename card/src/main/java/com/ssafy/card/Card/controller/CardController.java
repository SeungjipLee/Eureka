package com.ssafy.card.Card.controller;

import com.ssafy.card.Card.dto.response.CardHistoryResponse;
import com.ssafy.card.Card.entity.CardEntity;
import com.ssafy.card.Card.entity.CardHistoryEntity;
import com.ssafy.card.Card.service.CardService;
import com.ssafy.card.User.dto.response.CardPayHistoryResponse;
import com.ssafy.card.User.dto.response.UserCardResponse;
import com.ssafy.card.User.entity.UserCardEntity;
import com.ssafy.card.common.ApiResponse;
import com.ssafy.card.common.ResponseCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/card")
public class CardController {

    private final CardService cardService;

    @GetMapping("/list")
    public ApiResponse getCardList(@AuthenticationPrincipal UserDetails userDetails){

        log.debug("특정 유저 모든 카드 조회");
        List<UserCardResponse> result = cardService.cardList(userDetails);

        return new ApiResponse(ResponseCode.SUCCESS.getMessage(), ResponseCode.SUCCESS.getStatus(), result);
    }

    @GetMapping("/history")
    public ApiResponse<?> getCardHistory(@AuthenticationPrincipal UserDetails userDetails,
                                         @RequestParam String cardIdentifier, @RequestParam String yyyymm){

        log.debug("카드 결제 내역 조회, 카드식별자 : "+ cardIdentifier );
        String phoneNumber = userDetails.getUsername();
        List<CardHistoryEntity> result = cardService.cardHistory(phoneNumber, cardIdentifier, yyyymm);

        return new ApiResponse(ResponseCode.SUCCESS.getMessage(), ResponseCode.SUCCESS.getStatus(), result);
    }
}
