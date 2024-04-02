package com.ssafy.eureka.domain.card.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Top3ListAndLargeCategoryNameResponse {

    String largeCategoryName;
    List<CardRecommendTop3List> list;
}
