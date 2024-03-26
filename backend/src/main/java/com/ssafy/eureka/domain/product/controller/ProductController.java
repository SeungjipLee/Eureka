package com.ssafy.eureka.domain.product.controller;

import com.ssafy.eureka.domain.product.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "카드 상품 API", description = "상품 조회")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/prod")
public class ProductController {

    private final ProductService productService;

//    @Operation(summary = "절대 임의로 하지 말기!!!")
//    @GetMapping("/admin/regist")
//    public ApiResponse registAllCardProduct (){
//        cardService.registAllCardProduct();
//        return ApiResponse.ok("등록 성공");
//    }

    // 카드사별, 카테고리 분류별
    @GetMapping("/list/{company}")
    public ResponseEntity<?> getCardProdCompanyList(@PathVariable String company){

        productService.cardProdCompanyList();
        return ResponseEntity.ok().build();
    }

    @GetMapping("/list{category}")
    public ResponseEntity<?> getCardProdCategoryList(@PathVariable String category){

        return ResponseEntity.ok().build();
    }

    // 카드 상품 상세 조회
//    @GetMapping("/${cardId}")
//    public ApiResponse getCardProdDetail(){
//
//        return ApiResponse.ok("카드 상품 상세 조회 성공");
//    }

    // 카드 상품 추천
//    @GetMapping("/recommend/${type}")
//    public ApiResponse getCardProdRecommend(){
//
//        return ApiResponse.ok("카드 상품 추천 성공");
//    }
}
