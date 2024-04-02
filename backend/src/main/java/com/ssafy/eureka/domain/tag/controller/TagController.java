package com.ssafy.eureka.domain.tag.controller;

import com.ssafy.eureka.domain.tag.service.TagService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "태그 API", description = "태그 조회")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/tag")
public class TagController {

    private final TagService tagService;

    @Operation(summary = "태그 조회")
    @GetMapping("/list")
    public ResponseEntity<?> listTag(@AuthenticationPrincipal UserDetails userDetails) {
        log.debug("태그 조회 userId : " + userDetails.getUsername());
        return ResponseEntity.ok(tagService.searchList(userDetails.getUsername()));
    }

}
