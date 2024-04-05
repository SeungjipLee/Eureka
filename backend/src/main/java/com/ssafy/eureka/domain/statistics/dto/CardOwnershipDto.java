package com.ssafy.eureka.domain.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;
import org.jetbrains.annotations.NotNull;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardOwnershipDto {
    private int cardId;
    private String cardName;
    private String info;
    private String imagePath;
    private int imageAttr;
    private Long ownershipCount;

    List<BenefitCompareInfo> benefitComapareList;


    public CardOwnershipDto(int cardId, String cardName, String imagePath, int imageAttr, int ownershipCount) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.imagePath = imagePath;
        this.imageAttr = imageAttr;
        this.ownershipCount = (long) ownershipCount;
    }

    public CardOwnershipDto(int cardId, String cardName, String imagePath, int imageAttr, Long ownershipCount) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.imagePath = imagePath;
        this.imageAttr = imageAttr;
        this.ownershipCount = (long) ownershipCount;
    }

    @NoArgsConstructor
    @AllArgsConstructor
    @Setter
    @Getter
    public static class BenefitCompareInfo implements Comparable<BenefitCompareInfo>{
        private String largeCategoryName;
        private int beforeDiscount;
        private int afterDiscount;

        @Override
        public int compareTo(@NotNull BenefitCompareInfo o) {
            int thisDiscountDifference = this.beforeDiscount - this.afterDiscount;
            int otherDiscountDifference = o.beforeDiscount - o.afterDiscount;
            if (thisDiscountDifference != otherDiscountDifference) {
                return Integer.compare(thisDiscountDifference, otherDiscountDifference);
            }

            if (this.afterDiscount != o.afterDiscount) {
                return Integer.compare(this.afterDiscount, o.afterDiscount);
            }

            return Integer.compare(this.beforeDiscount, o.beforeDiscount);
        }
    }
}
