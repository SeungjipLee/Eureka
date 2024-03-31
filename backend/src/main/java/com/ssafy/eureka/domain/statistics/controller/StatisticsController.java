package com.ssafy.eureka.domain.statistics.controller;

import com.ssafy.eureka.domain.statistics.service.StatisticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Slf4j
@Tag(name = "통계 API", description = "소비내역, 할인내역 통계")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/static")
public class StatisticsController {

    private final StatisticService statisticsService;

    @Operation(summary = "월간 총 소비, 할인 금액 조회")
    @GetMapping("/{yyyyMM}")
    public ResponseEntity<?> getTotalStatistics(@AuthenticationPrincipal UserDetails userDetails,
                                                @PathVariable("yyyyMM") String yyyyMM) {
        log.debug("총 소비, 할인 금액 조회, userId : " + userDetails.getUsername() + ", 날짜 : " + yyyyMM);
        return ResponseEntity.ok(statisticsService.totalStatistics(userDetails.getUsername(), yyyyMM));
    }

    @Operation(summary = "월간 카테고리별 총 소비 통계")
    @GetMapping("/{yyyyMM}/consumption")
    public ResponseEntity<?> getConsumptionStatistics(@AuthenticationPrincipal UserDetails userDetails,
                                                      @PathVariable("yyyyMM") String yyyyMM) {
        log.debug("카테고리별 총 소비통계, userId : " + userDetails.getUsername() + ", 날짜 : " + yyyyMM);
        return ResponseEntity.ok(statisticsService.consumptionStatisticsResponse(userDetails.getUsername(), yyyyMM));
    }

    @Operation(summary = "월간 카테고리별 총 할인 통계")
    @GetMapping("/{yyyyMM}/discount")
    public ResponseEntity<?> getDiscountStatistics(@AuthenticationPrincipal UserDetails userDetails,
                                                   @PathVariable("yyyyMM") String yyyyMM) {
        log.debug("카테고리별 총 할인통계, userId : " + userDetails.getUsername() + ", 날짜 : " + yyyyMM);
        return ResponseEntity.ok(statisticsService.discountStatisticsResponse(userDetails.getUsername(), yyyyMM));
    }

    @Operation(summary = "월간 카테고리별 소비 통계 (카드별)")
    @GetMapping("/{yyyyMM}/consumption/{userCardId}")
    public ResponseEntity<?> getConsumptionStatisticsByUserCard(@AuthenticationPrincipal UserDetails userDetails,
                                                                @PathVariable("yyyyMM") String yyyyMM,
                                                                @PathVariable("userCardId") int userCardId) {
        log.debug("카테고리별 소비통계 (카드별), userCardId : " + userCardId + ", 날짜 : " + yyyyMM);
        return ResponseEntity.ok(statisticsService.consumptionStatisticsByUserCardResponse(userCardId, yyyyMM));
    }

    @Operation(summary = "월간 카테고리별 할인 통계 (카드별)")
    @GetMapping("/{yyyyMM}/discount/{userCardId}")
    public ResponseEntity<?> getDiscountStatisticsByUserCard(@AuthenticationPrincipal UserDetails userDetails,
                                                             @PathVariable("yyyyMM") String yyyyMM,
                                                             @PathVariable("userCardId") int userCardId) {
        log.debug("카테고리별 할인통계 (카드별), userCardId : " + userCardId + ", 날짜 : " + yyyyMM);
        return ResponseEntity.ok(statisticsService.discountStatisticsByUserCardResponse(userCardId, yyyyMM));
    }

    @Operation(summary = "이달의 혜택을 가장 많이 받은 카드")
    @GetMapping("/{yyyyMM}/best-card")
    public ResponseEntity<?> getBestCardStatistics(@AuthenticationPrincipal UserDetails userDetails,
                                                   @PathVariable("yyyyMM") String yyyyMM) {
        log.debug("이달의 카드, userId : " + userDetails.getUsername() + ", 날짜 : " + yyyyMM);
        return ResponseEntity.ok(statisticsService.bestCardStatisticsResponse(userDetails.getUsername(), yyyyMM));
    }

    @Operation(summary = "많이 보유한 카드 top 10")
    @GetMapping("/most-owned/cards")
    public ResponseEntity<?> getCardOwnershipOverview(@AuthenticationPrincipal UserDetails userDetails) {
        log.debug("유저 " + userDetails.getUsername() + " : 보유카드 전체 통계 조회");
        return ResponseEntity.ok(statisticsService.cardOwnershipOverviewResponse());
    }

}
