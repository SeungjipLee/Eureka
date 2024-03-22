package com.ssafy.card.Auth.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PayRequestDto {
    private String cardNumber; // 16자리
    private String cvc;
    private String expired_year;
    private String expired_month;
    private String password; // 비밀번호 앞 2자리
}
