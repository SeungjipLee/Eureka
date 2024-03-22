package com.ssafy.eureka.domain.payment.dto.request;

import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class PayTokenRequest {
    private String cardNumber;
    private String cvc;
    private String expired_year;
    private String expired_month;
    private String password;

    public PayTokenRequest(RegistPayCardRequest registPayCardRequest) {
        this.cardNumber = registPayCardRequest.getCardNumber();
        this.cvc = registPayCardRequest.getCvc();
        this.expired_year = registPayCardRequest.getExpired_year();
        this.expired_month = registPayCardRequest.getExpired_month();
        this.password = registPayCardRequest.getPassword();
    }
}
