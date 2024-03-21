package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import com.ssafy.eureka.domain.card.dto.CardBenefitEntity;
import com.ssafy.eureka.domain.card.dto.CardCompanyEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.response.CardCompanyListResponse;
import com.ssafy.eureka.domain.card.dto.response.CardProdCompanyListResponse;
import com.ssafy.eureka.domain.card.repository.CardBenefitDetailRepository;
import com.ssafy.eureka.domain.card.repository.CardBenefitRepository;
import com.ssafy.eureka.domain.card.repository.CardCompanyRepository;
import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.card.util.CardDataUtil;
import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import com.ssafy.eureka.domain.category.repository.LargeCategoryRepository;
import jakarta.validation.constraints.NotNull;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CardServiceImpl implements CardService{

    private final CardRepository cardRepository;
    private final CardCompanyRepository cardCompanyRepository;
    private final CardBenefitRepository cardBenefitRepository;
    private final CardBenefitDetailRepository cardBenefitDetailRepository;
    private final LargeCategoryRepository largeCategoryRepository;
    private final CardDataUtil cardDatautil;

    @Override
    public void registAllCardProduct() {
        cardDatautil.cardProductFileLoad();
    }

    @Override
    public CardCompanyListResponse listCardCompany() {
        return new CardCompanyListResponse(cardCompanyRepository.findAll());
    }

    @Override
    public List<CardProdCompanyListResponse> cardProdCompanyList(int companyId) {

        List<CardProdCompanyListResponse> cardProdCompanyList = new ArrayList<>();
        int cnt=0;

        CardCompanyEntity cardCompanyEntity = cardCompanyRepository.findByCardCompanyId(companyId);
        String companyName = cardCompanyEntity.getCompanyName(); // 카드사명
        System.out.println("카드사");

//        CardEntity cardEntity = cardRepository.findByCardCompanyId(companyId);
        List<CardEntity> cardEntityList = cardRepository.findByCardCompanyId(companyId);
        System.out.println("카드리스트");

        for(int i=0; i<cardEntityList.size(); i++){

//            int cardId = cardEntity.getCardId();
            int cardId = cardEntityList.get(i).getCardId();
            String cardName = cardEntityList.get(i).getCardName(); // 카드명

            // 한 카드에서 한 혜택의 상위 2개의 혜택 디테일만 보여줄거야
            List<CardBenefitEntity> cardBenefitEntityList = cardBenefitRepository.findByCardId(cardId);
            for(int j=0; j<cardBenefitEntityList.size(); j++) {

                if(cardBenefitEntityList.get(j) == null) continue;
                int cardBenefitId = cardBenefitEntityList.get(j).getCardBenefitId(); // 카드 혜택 id;

                System.out.println("카드혜택");
                System.out.println("cardBenefitEntity: " + cardBenefitEntityList.get(j));
                System.out.println("cardBenefitId: " + cardBenefitEntityList.get(j).getCardBenefitId());

                List<CardBenefitDetailEntity> cardBenefitDetailEntityList = cardBenefitDetailRepository.findByCardBenefitId(cardBenefitId);
                for(int k=0; k<cardBenefitDetailEntityList.size(); k++){

                if(cardBenefitDetailEntityList.get(k) == null) continue;
                else cnt++;

                System.out.println("카드혜택상세");
                System.out.println("cardBenefitDetailEntity: "+ cardBenefitDetailEntityList.get(k));
//                int cardBenefitDetailId = cardBenefitDetailEntity.getCardBenefitDetailId(); // 카드 혜택 상세 id;
                int largeCategoryId = cardBenefitDetailEntityList.get(k).getLargeCategoryId(); // 대분류 카테고리 id
                int smallCategoryId = cardBenefitDetailEntityList.get(k).getSmallCategoryId(); // 소분류 카테고리 id
                String discountCostType = cardBenefitDetailEntityList.get(k).getDiscountCostType(); // %, 원, L
                float discountCost = cardBenefitDetailEntityList.get(k).getDiscountCost(); // 할인 비용

                LargeCategoryEntity largeCategoryEntity = largeCategoryRepository.findByLargeCategoryId(largeCategoryId);
                String largeCategoryName = largeCategoryEntity.getCategoryName();

                cardProdCompanyList.add(new CardProdCompanyListResponse(
                        companyName, cardName, discountCostType,
                        discountCost, largeCategoryName
                ));

                    if(cnt==2) break;
                }
                if(cnt==2) {
                    cnt=0;
                    break;
                }
            }
        }

        return cardProdCompanyList;
    }
}
