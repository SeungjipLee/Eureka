package com.ssafy.eureka.domain.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class CheckUserRespnose {
    private int userId;
    private String userName;
}
