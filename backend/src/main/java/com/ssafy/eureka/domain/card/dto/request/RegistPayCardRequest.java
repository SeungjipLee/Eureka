package com.ssafy.eureka.domain.card.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RegistPayCardRequest {
    private int userCardId;
    private String cardNumber; // 16자리
    private String cvc;
    private String expired_year;
    private String expired_month;
    private String password; // 비밀번호 앞 2자리
}
