package com.ssafy.eureka.domain.statistics.dto.response;

import com.ssafy.eureka.domain.statistics.dto.CardOwnershipOverview;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardOwnershipOverviewResponse {
    private List<CardOwnershipOverview> cardOwnershipOverviewList;

}
