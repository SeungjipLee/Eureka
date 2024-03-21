package com.ssafy.eureka.domain.card.controller;

import com.ssafy.eureka.common.response.ApiResponse;
import com.ssafy.eureka.domain.card.service.CardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "카드 상품 API", description = "상품 조회...")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/card")
public class CardController {

    private final CardService cardService;

    @Operation(summary = "카드사 조회")
    @GetMapping("/comp/list")
    public ApiResponse<?> listLargeCategory() {
        log.debug("카드사 조회");
        return ApiResponse.ok(cardService.listCardCompany());
    }

    @Operation(summary = "절대 임의로 하지 말기!!!")
    @GetMapping("/admin/regist")
    public ApiResponse registAllCardProduct (){
        log.debug("카드 상품 등록");
        cardService.registAllCardProduct();
        return ApiResponse.ok("등록 성공");
    }

}
