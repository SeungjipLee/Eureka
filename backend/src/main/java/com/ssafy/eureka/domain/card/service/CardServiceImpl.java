package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import com.ssafy.eureka.domain.card.dto.CardBenefitEntity;
import com.ssafy.eureka.domain.card.dto.CardCompanyEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.response.*;
import com.ssafy.eureka.domain.card.repository.CardBenefitDetailRepository;
import com.ssafy.eureka.domain.card.repository.CardBenefitRepository;
import com.ssafy.eureka.domain.card.repository.CardCompanyRepository;
import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.card.util.CardDataUtil;
import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import com.ssafy.eureka.domain.category.repository.LargeCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Random;

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
    public List<CardProdListResponse> cardProdCompanyList(int companyId) {

        List<CardProdListResponse> cardProdCompanyList = new ArrayList<>();
        List<CardDetailBenefitList> cardDetailBenefitList;

        CardCompanyEntity cardCompanyEntity = cardCompanyRepository.findByCardCompanyId(companyId);
        String companyName = cardCompanyEntity.getCompanyName(); // 카드사명

        List<CardEntity> cardEntityList = cardRepository.findByCardCompanyId(companyId);

        for(int i=0; i<cardEntityList.size(); i++){

            cardDetailBenefitList = new ArrayList<>();
            int cardId = cardEntityList.get(i).getCardId();
            String cardName = cardEntityList.get(i).getCardName(); // 카드명
            String cardImagePath = cardEntityList.get(i).getImagePath();

            // 한 카드에서 한 혜택의 상위 2개의 혜택 디테일만 보여줄거야
            List<CardBenefitEntity> cardBenefitEntityList = cardBenefitRepository.findByCardId(cardId);
            for(int j=0; j<cardBenefitEntityList.size(); j++) {

                if(cardBenefitEntityList.get(j) == null) continue;
                int cardBenefitId = cardBenefitEntityList.get(j).getCardBenefitId(); // 카드 혜택 id;
                String info = cardBenefitEntityList.get(j).getInfo();

                List<CardBenefitDetailEntity> cardBenefitDetailEntityList = cardBenefitDetailRepository.findByCardBenefitId(cardBenefitId);
                if (cardBenefitDetailEntityList == null ) continue;

                for(int k=0; k<cardBenefitDetailEntityList.size(); k++){

                if(cardBenefitDetailEntityList.get(k) == null) continue;

//                int cardBenefitDetailId = cardBenefitDetailEntity.getCardBenefitDetailId(); // 카드 혜택 상세 id;
                int largeCategoryId = cardBenefitDetailEntityList.get(k).getLargeCategoryId(); // 대분류 카테고리 id
                int smallCategoryId = cardBenefitDetailEntityList.get(k).getSmallCategoryId(); // 소분류 카테고리 id
                String discountCostType = cardBenefitDetailEntityList.get(k).getDiscountCostType(); // %, 원, L
                float discountCost = cardBenefitDetailEntityList.get(k).getDiscountCost(); // 할인 비용

                LargeCategoryEntity largeCategoryEntity = largeCategoryRepository.findByLargeCategoryId(largeCategoryId);
                String largeCategoryName = largeCategoryEntity.getCategoryName();

                // discountCostType, discountCostType,largeCategoryEntity
                // 3개의 값이 같은 상세 혜택이 여러 개라 같은 값 2개가 들어감, 소분류 상으로 들어가야 구분될 듯
                    cardDetailBenefitList.add(new CardDetailBenefitList(discountCostType, discountCost, largeCategoryName));
                    if(cardDetailBenefitList.size() == 2) break;

                // 카드 혜택 상세 2개 채웠으면 그만, 1개만 있다면 카드 혜택 상세 리스트 사이즈가 1이라 한 번만 찾고 끝
                }// 카드 혜택 상세

                if(cardDetailBenefitList.size() == 2) {
                    cardProdCompanyList.add(new CardProdListResponse(
                            cardId, companyName, cardName, cardImagePath,
                            info, cardDetailBenefitList
                    ));
                    break;
                }
            } // 카드 혜택
        }
        return cardProdCompanyList;
    }

    @Override
    public List<CardProdListResponse> cardProdCategoryList(int categoryId) {

        List<CardProdListResponse> cardProdCategoryList = new ArrayList<>();
        List<CardDetailBenefitList> cardDetailBenefitList;

        List<CardBenefitDetailEntity> cardBenefitDetailEntityList =
                cardBenefitDetailRepository.findByLargeCategoryId(categoryId);

        for(int i=0; i<cardBenefitDetailEntityList.size(); i++) {

            cardDetailBenefitList = new ArrayList<>();
            if (cardBenefitDetailEntityList.get(i) == null) continue;

            String discountCostType = cardBenefitDetailEntityList.get(i).getDiscountCostType(); // %, 원, L
            float discountCost = cardBenefitDetailEntityList.get(i).getDiscountCost(); // 할인 비용
            int cardBenefitId = cardBenefitDetailEntityList.get(i).getCardBenefitId(); // 카드 혜택 아이디

            // 같은 혜택이라면 같은 카드
            if(i>0 && cardBenefitDetailEntityList.get(i-1).getCardBenefitId() == cardBenefitId) continue;

            LargeCategoryEntity largeCategoryEntity = largeCategoryRepository.findByLargeCategoryId(categoryId);
            String largeCategoryName = largeCategoryEntity.getCategoryName();

            cardDetailBenefitList.add(new CardDetailBenefitList(discountCostType, discountCost, largeCategoryName));

            CardBenefitEntity cardBenefitEntity = cardBenefitRepository.findByCardBenefit(cardBenefitId);

            if (i > 0){
                int  previousCardBenefitId = cardBenefitDetailEntityList.get(i-1).getCardBenefitId();
                CardBenefitEntity preCardBenefitEntity = cardBenefitRepository.findByCardBenefit(previousCardBenefitId);

            // 같은 카드 거르기
            if (preCardBenefitEntity.getCardId() == cardBenefitEntity.getCardId()) continue;
            }

                    int cardId = cardBenefitEntity.getCardId();
                    String info = cardBenefitEntity.getInfo();

                    CardEntity cardEntity = cardRepository.findByCard(cardId)
                            .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

                    String cardName = cardEntity.getCardName();
                    String cardImagePath = cardEntity.getImagePath();
                    int cardCompanyId = cardEntity.getCardCompanyId();

                        CardCompanyEntity cardCompanyEntity = cardCompanyRepository.findByCardCompanyId(cardCompanyId);
                        String companyName = cardCompanyEntity.getCompanyName();

                        cardProdCategoryList.add(new CardProdListResponse(
                                cardId, companyName, cardName, cardImagePath,
                                info, cardDetailBenefitList
                        ));
                }
        return cardProdCategoryList;
    }

    @Override
    public CardProdDetailResponse cardProdDetail(int cardId) {

        CardEntity cardEntity = cardRepository.findByCard(cardId)
                .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

        String imagePath = cardEntity.getImagePath();
        String cardName = cardEntity.getCardName();
        int annualFee = cardEntity.getAnnualFee();
        int previousPerformance = cardEntity.getPreviousPerformance();
        String registerPage = cardEntity.getJoinPath();
        List<CardProdDetailBenefitList> list = new ArrayList<>();


        List<CardBenefitEntity> cardBenefitEntityList = cardBenefitRepository.findByCardId(cardId);
        for (int i=0; i<cardBenefitEntityList.size(); i++){

            int cardBenefitId = cardBenefitEntityList.get(i).getCardBenefitId();
            List<CardBenefitDetailEntity> cardBenefitDetailEntityList = cardBenefitDetailRepository.findByCardBenefitId(cardBenefitId);

            for(int j=0; j<cardBenefitDetailEntityList.size(); j++){
                int largeCategoryId = cardBenefitDetailEntityList.get(j).getLargeCategoryId();
                LargeCategoryEntity largeCategoryEntity = largeCategoryRepository.findByLargeCategoryId(largeCategoryId);
                String largeCategoryName = largeCategoryEntity.getCategoryName();
                list.add(new CardProdDetailBenefitList(cardBenefitDetailEntityList.get(j), largeCategoryName));
            }
        }

        CardProdDetailResponse cardProdDetailResponse = new CardProdDetailResponse(
                cardId, imagePath, cardName, annualFee, previousPerformance,
                registerPage, list);
        return cardProdDetailResponse;
    }

    @Override
    public CardEntity cardProdRecommend() {

        List<CardEntity> cardEntityList = cardRepository.findAllBy();

        int size = cardEntityList.size();

        Random rd = new Random();
        int rdId = rd.nextInt(size);

        CardEntity cardEntity = cardEntityList.get(rdId);

        return cardEntity;
    }
}
