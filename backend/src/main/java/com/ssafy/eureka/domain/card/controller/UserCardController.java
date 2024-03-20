package com.ssafy.eureka.domain.card.controller;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "유저 카드 API", description = "보유 카드...")
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/ucard")
public class UserCardController {

}
