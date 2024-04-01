package com.ssafy.eureka.domain.statistics.dto.response;

import com.ssafy.eureka.domain.statistics.dto.ConsumptionCompareDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.math.BigInteger;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConsumptionCompareResponse {
    private char age;
    private char gender;
    private BigInteger userAmt;
    private BigInteger anotherAmt;
    private List<ConsumptionCompareDto> data;
}
