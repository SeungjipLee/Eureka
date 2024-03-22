package com.ssafy.eureka.domain.card.dto.request;

import java.util.List;
import lombok.Getter;

@Getter
public class SearchUserCardRequest {
    private List<Integer> cardCompayList;
}
