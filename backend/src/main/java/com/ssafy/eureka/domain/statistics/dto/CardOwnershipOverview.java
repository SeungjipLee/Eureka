package com.ssafy.eureka.domain.statistics.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CardOwnershipOverview {
    private int cardId;
    private String cardName;
    private String imagePath;
    private int imageAttribute;
    private int ownershipCount;
}
