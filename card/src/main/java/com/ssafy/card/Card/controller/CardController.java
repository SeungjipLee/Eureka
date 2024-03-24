package com.ssafy.card.Card.controller;

import com.ssafy.card.Card.service.CardService;
import com.ssafy.card.common.ApiResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/card")
public class CardController {

    private final CardService cardService;

    @PostMapping("list")
    public ApiResponse getCardList(){

//        ApiResponse<?> result =

                return null;
//        return new ApiResponse<>();
    }
}
