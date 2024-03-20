package com.ssafy.eureka.domain.card.util;

import com.google.gson.Gson;
import com.google.gson.JsonArray;
import com.google.gson.JsonElement;
import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import com.ssafy.eureka.domain.card.dto.CardBenefitEntity;
import com.ssafy.eureka.domain.card.dto.CardCompanyEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.CardProductDto;
import com.ssafy.eureka.domain.card.dto.CardProductDto.Benefit;
import com.ssafy.eureka.domain.card.dto.CardProductDto.Benefit.BenefitDetail;
import com.ssafy.eureka.domain.card.repository.CardBenefitDetailRepository;
import com.ssafy.eureka.domain.card.repository.CardBenefitRepository;
import com.ssafy.eureka.domain.card.repository.CardCompanyRepository;
import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import com.ssafy.eureka.domain.category.dto.SmallCategoryEntity;
import com.ssafy.eureka.domain.category.repository.LargeCategoryRepository;
import com.ssafy.eureka.domain.category.repository.SmallCategoryRepository;
import java.io.File;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Component;

@Component
@AllArgsConstructor
public class CardDataUtil {
    private final static String directoryPath = "../crowling/data";

    private CardCompanyRepository cardCompanyRepository;
    private CardRepository cardRepository;
    private CardBenefitRepository cardBenefitRepository;
    private CardBenefitDetailRepository cardBenefitDetailRepository;
    private LargeCategoryRepository largeCategoryRepository;
    private SmallCategoryRepository smallCategoryRepository;

    /*
        카드 정보를 가져오는 API가 존재하지 않아
        크롤링을 통해 JSON File을 만들고 File을 읽어 DB에 저장
     */
    public void cardProductFileLoad () {
        Gson gson = new Gson();

        List<CardCompanyEntity> cardCompanyList = cardCompanyRepository.findAll();

        // 카드사 이름 -> 카드사 id
        Map<String, Integer> cardCompany = new HashMap<>();
        for(CardCompanyEntity comp : cardCompanyList){
            cardCompany.put(comp.getCompanyName(), comp.getCardCompanyId());
        }

        // 대분류 카테고리 -> 대분류 카테고리 id
        List<LargeCategoryEntity> largeCategoryList = largeCategoryRepository.findAll();
        Map<String, Integer> largeCategory = new HashMap<>();
        for(LargeCategoryEntity category : largeCategoryList){
            largeCategory.put(category.getCategoryName(), category.getLargeCategoryId());
        }

        File folder = new File(directoryPath);
        File[] listOfFiles = folder.listFiles();

        if (listOfFiles != null) {
            for (File file : listOfFiles) {
                if (file.isFile() && file.getName().endsWith(".json")) {
                    try {
                        String content = new String(Files.readAllBytes(file.toPath()), StandardCharsets.UTF_8);
                        JsonElement jsonElement = gson.fromJson(content, JsonElement.class);
                        JsonArray jsonArray = jsonElement.getAsJsonObject().getAsJsonArray("data");

                        String cardType = file.getName().substring(0, 5);
                        if(cardType.equals("check")){
                            cardType = "0";
                        }else if(cardType.equals("credi")){
                            cardType = "1";
                        }else{
                            cardType = "2";
                        }

                        for (JsonElement element : jsonArray) {
                            CardProductDto cardProduct = gson.fromJson(element, CardProductDto.class);

                            // 여기서 obj를 DB에 저장하자.

                            // 1. 카드 저장
                            CardEntity card = CardEntity.regist(
                                cardCompany.get(cardProduct.getCardCompany()),
                                Integer.valueOf(cardType),
                                cardProduct);
                            cardRepository.save(card);

                            // 2. 카드 혜택 정보 저장
                            if(cardProduct.getBenefits() != null){
                                for(int i = 0; i < cardProduct.getBenefits().size(); ++i){
                                    Benefit benefit = cardProduct.getBenefits().get(i);

                                    if(benefit.getTitle().equals("유의사항")) continue;

                                    CardBenefitEntity cardBenefit = CardBenefitEntity.regist(card.getCardId(), benefit);
                                    cardBenefitRepository.save(cardBenefit);

                                    // 3. 카드 혜택 상세 정보 저장
                                    if(benefit.getDetails() != null){
                                        for(BenefitDetail detail : benefit.getDetails()){
                                            Optional<SmallCategoryEntity> entity = smallCategoryRepository.findByCategoryName(detail.getSubCategory());
                                            int smallCategoryId = 0;
                                            if(entity.isPresent()){
                                                smallCategoryId = entity.get().getSmallCategoryId();
                                            }else{
                                                SmallCategoryEntity smallCategory = SmallCategoryEntity.regist(largeCategory.get(detail.getMainCategory()), detail.getSubCategory());
                                                smallCategoryRepository.save(smallCategory);
                                                smallCategoryId = smallCategory.getSmallCategoryId();
                                            }

                                            CardBenefitDetailEntity cardBenefitDetail = CardBenefitDetailEntity.regist(
                                                cardBenefit.getCardBenefitId(),
                                                largeCategory.get(detail.getMainCategory()),
                                                smallCategoryId,
                                                detail);
                                            cardBenefitDetailRepository.save(cardBenefitDetail);
                                        }
                                    }
                                }
                            }
                        }
                    } catch (Exception e) {
                        e.printStackTrace();
                    }
                }
            }
        }
    }
}
