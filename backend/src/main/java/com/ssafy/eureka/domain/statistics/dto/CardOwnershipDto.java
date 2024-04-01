package com.ssafy.eureka.domain.statistics.dto;

import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardOwnershipDto {
    private int cardId;
    private String cardName;
    private String imagePath;
    private int imageAttr;
    private int ownershipCount;
    private List<LargeCategoryEntity> categoryList;

    public CardOwnershipDto(int cardId, String cardName, String imagePath, int imageAttr, int ownershipCount) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.imagePath = imagePath;
        this.imageAttr = imageAttr;
        this.ownershipCount = ownershipCount;
    }

    public CardOwnershipDto(int cardId, String cardName, String imagePath, int imageAttr, Long ownershipCount) {
        this.cardId = cardId;
        this.cardName = cardName;
        this.imagePath = imagePath;
        this.imageAttr = imageAttr;
        this.ownershipCount = ownershipCount.intValue();
    }

}
