package com.ssafy.eureka.domain.statistics.dto.response;

import com.ssafy.eureka.domain.statistics.dto.CardOwnershipDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardOwnershipResponse {
    private SearchInfo searchInfo;
    private List<CardOwnershipDto> cardOwnershipList;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class SearchInfo {
        private int ageGroup;
        private int gender;
    }
}
