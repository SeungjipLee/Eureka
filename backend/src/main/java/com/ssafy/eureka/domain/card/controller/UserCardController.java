package com.ssafy.eureka.domain.card.controller;

import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest;
import com.ssafy.eureka.domain.card.dto.request.SearchUserCardRequest;
import com.ssafy.eureka.domain.card.service.UserCardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "유저 카드 API", description = "보유 카드...")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ucard")
public class UserCardController {

    private final UserCardService userCardService;

    @Operation(summary = "MyData 보유카드 검색하기")
    @PostMapping("/list/mydata")
    public ResponseEntity<?> searchUserCard(@AuthenticationPrincipal UserDetails userDetails,
        @RequestBody SearchUserCardRequest searchUserCardRequest){
        log.debug("마이데이터 보유카드 검색, userId : " + userDetails.getUsername());
        log.debug("카드사 개수 : " + searchUserCardRequest.getCardCompayList().size());
        return ResponseEntity.ok(userCardService.searchUserCard(userDetails.getUsername(), searchUserCardRequest));
    }

    @Operation(summary = "등록한 보유 카드 조회")
    @PostMapping("/list/{status}")
    public ResponseEntity<?> listUserCard(@AuthenticationPrincipal UserDetails userDetails, @PathVariable("status") int status){
        log.debug("등록한 보유 카드 검색, userId : " + userDetails.getUsername() + ", status : " + status);
        return ResponseEntity.ok(userCardService.listUserCard(userDetails.getUsername(), status));
    }

    @Operation(summary = "등록한 보유 카드 삭제")
    @DeleteMapping("/{userCardId}")
    public ResponseEntity<?> deleteUserCard(@AuthenticationPrincipal UserDetails userDetails,
        @RequestParam("userCardId") int userCardId) {
        log.debug("등록한 보유 카드 삭제, userId : " + userDetails.getUsername() + ", userCardId : " + userCardId);
        userCardService.deleteUserCard(userDetails.getUsername(), userCardId);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "해당 카드 모든 거래 내역 조회")
    @PostMapping("/list/pay")
    public ResponseEntity<?> listCardHistory(@AuthenticationPrincipal UserDetails userDetails,
        @RequestParam int userCardId, @RequestParam String yyyymm){
        log.debug("카드 내역 조회, userId : " + userDetails.getUsername() + ", userCardId : " + userCardId);
        return ResponseEntity.ok(userCardService.listCardHistory(userDetails.getUsername(), yyyymm));
    }

    @Operation(summary = "서버에 보유 카드 등록하기")
    @PostMapping("/regist")
    public ResponseEntity<?> registUserCard(@AuthenticationPrincipal UserDetails userDetails,
        @RequestBody RegistUserCardRequest registUserCardRequest) {
        log.debug("보유 카드 등록, userId : " + userDetails.getUsername());
        userCardService.registUserCard(userDetails.getUsername(), registUserCardRequest);
        return ResponseEntity.ok().build();
    }

    @Operation(summary = "결제 카드로 등록하기")
    @PostMapping("/regist/pay")
    public ResponseEntity<?> registPayCard(@AuthenticationPrincipal UserDetails userDetails,
        @RequestBody RegistPayCardRequest registPayCardRequest){
        log.debug("결제 카드 등록, userId : " + userDetails.getUsername());
        userCardService.registPayCard(userDetails.getUsername(), registPayCardRequest);
        return ResponseEntity.ok("뜽록 성공");
    }
}
