package com.ssafy.eureka.domain.card.dto.response;

import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import jakarta.persistence.Column;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CardProdDetailResponse {

    int cardId;
    String imagePath;
    String cardName;
    int annualFee;
//    String largeCategoryName;
    int previousPerformance;
    String registerPage;
    List<CardProdDetailBenefitList> list;

}
