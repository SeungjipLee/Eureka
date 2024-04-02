package com.ssafy.eureka.domain.card.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CardRecommendMainResponse {
    private CategoryCard categoryCard;
    private DdoraeCard ddoraeCard;

    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class CategoryCard{
        private String largeCategoryName;
        private int cardId;
        private String cardName;
        private String imagePath;
        private int imgAttr;

        private int beforeDiscount;
        private int afterDiscount;
    }
    @Setter
    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    public static class DdoraeCard{
        private int ageGroup;
        private int cardId;
        private String cardName;
        private String imagePath;
        private int imgAttr;

        private int beforeDiscount;
        private int afterDiscount;
    }




}
