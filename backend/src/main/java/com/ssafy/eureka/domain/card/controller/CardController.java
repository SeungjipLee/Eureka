package com.ssafy.eureka.domain.card.controller;

import com.ssafy.eureka.common.response.ApiResponse;
import com.ssafy.eureka.domain.card.service.CardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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

    // 카드사별, 카테고리 분류별
    @Operation(summary = "카드 상품 카드사별 조회")
    @GetMapping("/prod/comp/list/{companyId}")
    public ApiResponse<?> getCardProdCompanyList(@PathVariable int companyId){

        log.debug("카드 상품 카드사별 조회");
        cardService.cardProdCompanyList(companyId);
        return ApiResponse.ok(cardService.cardProdCompanyList(companyId));
    }

    @Operation(summary = "카드 상품 카테고리별 조회")
    @GetMapping("/prod/category/list/{categoryId}")
    public ApiResponse<?> getCardProdCategoryList(@PathVariable int categoryId){

        log.debug("카드 상품 카테고리별 조회");
        cardService.cardProdCategoryList(categoryId);
        return ApiResponse.ok(cardService.cardProdCategoryList(categoryId));
    }

    @Operation(summary = "카드 상품 상세 정보 조회")
    @GetMapping("/prod/detail/{cardId}")
    public ApiResponse<?> getCardProdDetail(@PathVariable int cardId){

        log.debug("카드 상품 상세 정보 조회");
        cardService.cardProdDetail(cardId);
        return ApiResponse.ok(cardService.cardProdDetail(cardId));
    }

    @Operation(summary = "절대 임의로 하지 말기!!!")
    @GetMapping("/admin/regist")
    public ApiResponse registAllCardProduct (){
        log.debug("카드 상품 등록");
        cardService.registAllCardProduct();
        return ApiResponse.ok("등록 성공");
    }

}
