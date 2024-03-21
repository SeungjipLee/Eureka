package com.ssafy.eureka.domain.category.controller;

import com.ssafy.eureka.common.response.ApiResponse;
import com.ssafy.eureka.domain.category.service.CategoryService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "카테고리 관련 API", description = "혜텍 대분류 카테고리 조회")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/category")
public class CategoryController {

    private final CategoryService categoryService;

    @Operation(summary = "대분류 카테고리 조회")
    @GetMapping("/list")
    public ApiResponse<?> listLargeCategory() {
        log.debug("대분류 카테고리 조회");
        return ApiResponse.ok(categoryService.listLargeCategory());
    }

}
