package com.ssafy.eureka.common;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@Tag(name = "예제 API", description = "테스트용 API")
@RestController
@RequestMapping("/")
public class APITestController {
    @Operation(summary = "테스트용 API", description = "참고용 API")
    @Parameter(name = "name", description = "사용자 이름 입력")
    @GetMapping("/")
    public String test(@RequestParam("name") String name){
        log.debug("테스트용 API, 사용자 이름 : " + name);
        return name + "님 안녕하세요";
    }
}
