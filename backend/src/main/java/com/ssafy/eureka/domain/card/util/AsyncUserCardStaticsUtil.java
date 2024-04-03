package com.ssafy.eureka.domain.card.util;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.CardBenefitDetailEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import com.ssafy.eureka.domain.card.repository.CardBenefitDetailRepository;
import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.card.repository.MydataTokenRepository;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.mydata.dto.MyDataToken;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse;
import com.ssafy.eureka.domain.mydata.feign.MyDataFeign;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionLargeStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionSmallStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountLargeStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountSmallStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountStaticEntity;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionSmallStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountSmallStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountStaticRepository;
import java.math.BigInteger;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Slf4j
@Component
@RequiredArgsConstructor
public class AsyncUserCardStaticsUtil {

    private final MydataTokenRepository mydataTokenRepository;
    private final UserCardRepository userCardRepository;
    private final ConsumptionStaticRepository consumptionStaticRepository;
    private final ConsumptionLargeStaticRepository consumptionLargeStaticRepository;
    private final ConsumptionSmallStaticRepository consumptionSmallStaticRepository;
    private final MyDataFeign myDataFeign;
    private final CardRepository cardRepository;

    private final CardBenefitDetailRepository cardBenefitDetailRepository;
    private final DiscountStaticRepository discountStaticRepository;
    private final DiscountLargeStaticRepository discountLargeStaticRepository;
    private final DiscountSmallStaticRepository discountSmallStaticRepository;

    @Async
    public void asyncStaticMethod(String userId, String cardIdentifier) {
        addStatistics(userId, cardIdentifier);
    }

    public void addStatistics(String userId, String cardIdentifier) {
        UserCardEntity userCardEntity = userCardRepository.findByCardIdentifier(cardIdentifier)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        LocalDate currentDate = LocalDate.now();

        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();
        int userCardId = userCardEntity.getUserCardId();

        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        for (int i = 0; i < 4; i++) {
            String yyyymm = String.format("%d%02d", currentYear, currentMonth);

            int yyyy = Integer.parseInt(yyyymm.substring(0, 4));
            int mm = Integer.parseInt(yyyymm.substring(4, 6));

            if (mm - i <= 0) {
                mm = 13 - i;
                yyyy -= 1;
            } else {
                mm = mm - i;
            }

            String year = String.valueOf(yyyy);
            String month = "";
            if (mm == 10 || mm == 11 || mm == 12) {
                month = String.valueOf(mm);
            } else {
                month = "0" + String.valueOf(mm);
            }

            yyyymm = year + month;

            MyDataApiResponse<?> response = myDataFeign.searchCardPayList(accessToken,
                userCardEntity.getCardIdentifier(), yyyymm);

            if (response.getStatus() != 200) {
                throw new CustomException(400, response.getMessage());
            }

            MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();

            if (myDataCardPayList == null) {
                return;
            }

            BigInteger totalConsumption = BigInteger.ZERO;

            for (int j = 0; j < myDataCardPayList.getMyDataCardHistoryList().size(); j++) {
                totalConsumption = totalConsumption.add(BigInteger.valueOf(
                    myDataCardPayList.getMyDataCardHistoryList().get(j).getApprovedAmt()));
            }
            consumptionStaticRepository.save(new ConsumptionStaticEntity(
                userCardId, year, month, totalConsumption));
            DiscountStaticEntity discountStatic = new DiscountStaticEntity(userCardId, year, month);
            discountStaticRepository.save(discountStatic);

            ConsumptionStaticEntity consumptionStaticEntity = consumptionStaticRepository.findByUserCardAndMonth(
                userCardId, month);
            int consumptionStaticId = consumptionStaticEntity.getConsumptionStaticId();

            for (int j = 0; j < myDataCardPayList.getMyDataCardHistoryList().size(); j++) {

                int largeCategoryId = myDataCardPayList.getMyDataCardHistoryList().get(j)
                    .getLargeCategoryId();
                Integer smallCategoryId = myDataCardPayList.getMyDataCardHistoryList().get(j)
                    .getSmallCategoryId();

                ConsumptionLargeStaticEntity consumptionLargeStaticEntity =
                    consumptionLargeStaticRepository.findByConsumptionStaticIdAndLargeCategoryId(
                        consumptionStaticId, largeCategoryId).orElse(null);

                if (consumptionLargeStaticEntity == null) {
                    consumptionLargeStaticRepository.save(new ConsumptionLargeStaticEntity(
                        consumptionStaticId, largeCategoryId, BigInteger.ZERO, 0
                    ));
                }

                DiscountLargeStaticEntity discountLargeStatic = discountLargeStaticRepository.findByDiscountStaticIdAndLargeCategoryId(
                        discountStatic.getDiscountStaticId(), largeCategoryId)
                    .orElse(new DiscountLargeStaticEntity(discountStatic.getDiscountStaticId(),
                        largeCategoryId));

                discountLargeStaticRepository.save(discountLargeStatic);

                consumptionLargeStaticEntity =
                    consumptionLargeStaticRepository.findByConsumptionStaticIdAndLargeCategoryId(
                        consumptionStaticId, largeCategoryId).orElse(null);

                BigInteger consumptionAmount = consumptionLargeStaticEntity.getConsumptionAmount();

                BigInteger amount = BigInteger.valueOf(
                    myDataCardPayList.getMyDataCardHistoryList().get(j).getApprovedAmt());

                consumptionLargeStaticEntity.setConsumptionAmount((consumptionAmount.add(amount)));

                int consumptionCount = consumptionLargeStaticEntity.getConsumptionCount();
                consumptionLargeStaticEntity.setConsumptionCount(consumptionCount + 1);
                consumptionLargeStaticEntity.setLargeCategoryId(largeCategoryId);

                consumptionLargeStaticRepository.save(consumptionLargeStaticEntity);

                int consumptionLargeStaticId = consumptionLargeStaticEntity.getConsumptionLargeStaticId();

                saveConsumptionSmall(userCardId, userCardEntity.getCardId(), discountStatic,
                    discountLargeStatic,
                    consumptionLargeStaticId, largeCategoryId,
                    smallCategoryId, amount);
            }
        }
    }

    public void saveConsumptionSmall(int userCardId, int cardId,
        DiscountStaticEntity discountStatic,
        DiscountLargeStaticEntity discountLargeStatic,
        int consumptionLargeStaticId, int largeCategoryId, Integer smallCategoryId, BigInteger amount) {
        ConsumptionSmallStaticEntity consumptionLargeStatic =
            consumptionSmallStaticRepository.findByConsumptionLargeStaticIdAndSmallCategoryId(
                consumptionLargeStaticId, smallCategoryId).orElse(null);


        if (consumptionLargeStatic == null) {
            consumptionLargeStatic = new ConsumptionSmallStaticEntity(
                consumptionLargeStaticId, smallCategoryId, BigInteger.ZERO, 0
            );
            consumptionSmallStaticRepository.save(consumptionLargeStatic);
        }

        BigInteger consumptionAmount = consumptionLargeStatic.getConsumption();
        int count = consumptionLargeStatic.getConsumptionCount();

        consumptionLargeStatic.setConsumption(consumptionAmount.add(amount));
        consumptionLargeStatic.setConsumptionCount(count + 1);

        consumptionSmallStaticRepository.save(consumptionLargeStatic);

        DiscountSmallStaticEntity discountSmallStatic = discountSmallStaticRepository.findByDiscountLargeStaticIdAndSmallCategoryId(
            discountLargeStatic.getDiscountLargeStaticId(), smallCategoryId).orElse(
            new DiscountSmallStaticEntity(discountLargeStatic.getDiscountLargeStaticId(),
                smallCategoryId));

        if(cardId == 90){
            int kkasdas = 1;
        }

        CardBenefitDetailEntity cardBenefitDetail = cardBenefitDetailRepository.findCardBenefitDetailsByCardIdAndCategory(cardId, largeCategoryId, smallCategoryId, PageRequest.of(0, 1))
            .stream()
            .findFirst()
            .orElse(cardBenefitDetailRepository.findCardBenefitDetailsByCardIdAndCategory(cardId, largeCategoryId, null, PageRequest.of(0, 1))
                .stream()
                .findFirst().orElse(null));

        if(cardBenefitDetail == null){
            List<CardBenefitDetailEntity> results = cardBenefitDetailRepository.findTopByCardIdAndLargeCategoryId(cardId, PageRequest.of(0, 1));
            if(!results.isEmpty()){
                cardBenefitDetail = results.get(0);
            }
        }

        LocalDate lastMonth = LocalDate.now().minusMonths(1);


        String yearStr = lastMonth.format(DateTimeFormatter.ofPattern("yyyy"));
        String monthStr = lastMonth.format(DateTimeFormatter.ofPattern("MM"));

        CardEntity cardEntity = cardRepository.findByCardId(cardId);

        int discount = 0;
        if (cardBenefitDetail != null) {
            if (cardBenefitDetail.getDiscountCostType().equals("원")) {
                discount = ((int) cardBenefitDetail.getDiscountCost());
            } else if (cardBenefitDetail.getDiscountCostType().equals("%")) {
                discount = (int) (amount.intValue() * (cardBenefitDetail.getDiscountCost() / 100));
            } else if (cardBenefitDetail.getDiscountCostType().equals("L")) {
                discount = ((int) cardBenefitDetail.getDiscountCost() * (amount.intValue() / 1800));
            }

            ConsumptionStaticEntity consumptionStatic = consumptionStaticRepository.findByUserCardIdAndYearAndMonth(
                userCardId, yearStr, monthStr).orElse(null);

            if ((consumptionStatic == null) || (consumptionStatic.getTotalConsumption().compareTo(
                BigInteger.valueOf(cardEntity.getPreviousPerformance())) < 0)) {
                discount = 0;
            }else{
                String year = LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy"));
                String month = LocalDate.now().format(DateTimeFormatter.ofPattern("MM"));

                if (discount > amount.intValue()) {
                    discount = amount.intValue();
                }

                if (cardBenefitDetail.getPayMin() > amount.intValue()) {
                    discount = 0;
                } else {
                    if ((cardBenefitDetail.getMonthlyLimitCount() != 0 && (discountSmallStatic.getDiscountCount() >= cardBenefitDetail.getMonthlyLimitCount())) ||
                        (cardBenefitDetail.getDiscountLimit() != 0 && (discountSmallStatic.getDiscount() > cardBenefitDetail.getDiscountLimit()))) {
                        discount = 0;
                    }
                    if ((cardBenefitDetail.getMonthlyLimitCount() != 0&& (discountLargeStatic.getDiscountCount() >= cardBenefitDetail.getMonthlyLimitCount())) ||
                        (cardBenefitDetail.getDiscountLimit() != 0 && (discountLargeStatic.getDiscountAmount() > cardBenefitDetail.getDiscountLimit()))) {
                        discount = 0;
                    }
                }
            }
        }

        if (discount != 0) {
            discountSmallStatic.addPay(discount);
            discountSmallStaticRepository.save(discountSmallStatic);
            discountLargeStatic.addPay(discount);
            discountLargeStaticRepository.save(discountLargeStatic);
            discountStatic.addPay(discount);
            discountStaticRepository.save(discountStatic);
        }
    }
}
