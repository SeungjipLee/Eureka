package com.ssafy.eureka.domain.card.util;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import com.ssafy.eureka.domain.card.repository.MydataTokenRepository;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.mydata.dto.MyDataToken;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse;
import com.ssafy.eureka.domain.mydata.feign.MyDataFeign;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionLargeStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionSmallStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionSmallStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionStaticRepository;
import java.math.BigInteger;
import java.time.LocalDate;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class AsyncUserCardStaticsUtil {

    private final MydataTokenRepository mydataTokenRepository;
    private final UserCardRepository userCardRepository;
    private final ConsumptionStaticRepository consumptionStaticRepository;
    private final ConsumptionLargeStaticRepository consumptionLargeStaticRepository;
    private final ConsumptionSmallStaticRepository consumptionSmallStaticRepository;
    private final MyDataFeign myDataFeign;

    @Async
    public void asyncStaticMethod(String userId, String cardIdentifier){
        addStatistics(userId, cardIdentifier);
    }

    public void addStatistics(String userId, String cardIdentifier){

        // 카드가 등록됐을 때만 3달 치 거래내역을 넣어주는 것도 생각
        UserCardEntity userCardEntity = userCardRepository.findByCardIdentifier(cardIdentifier)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        // 현재 날짜 가져오기
        LocalDate currentDate = LocalDate.now();

        // 현재 연도와 월 가져오기
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();

        // 저장했으면 userCardId가 생겼을 것
        int userCardId = userCardEntity.getUserCardId();

        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        // 등록 카드의 3달치 거래 내역을 소비 통계에 저장
        for(int i=0; i<3; i++){
            String yyyymm = String.format("%d%02d", currentYear, currentMonth);

//            log.debug("3달치 계산 시작");
            int yyyy = Integer.parseInt(yyyymm.substring(0, 4));
            int mm = Integer.parseInt(yyyymm.substring(4, 6));

//            log.debug("yyyy, mm : "+ yyyy + " / " + mm);

            if(mm-i <=0){
                // 년도 넘어가는 계산식 이거 아닌 듯 추후 수정
                mm = 13-i;
                yyyy -= 1;
            }
            else mm = mm - i;

            String year = String.valueOf(yyyy);
            String month = "";
            if(mm== 10 || mm == 11 || mm == 12){
                month = String.valueOf(mm);
            }
            else month = "0"+ String.valueOf(mm);

            yyyymm = year + month;
//            log.debug("yyyymm : "+ yyyymm);

            MyDataApiResponse<?> response = myDataFeign.searchCardPayList(accessToken,
                userCardEntity.getCardIdentifier(), yyyymm);

            if (response.getStatus() != 200) {
                throw new CustomException(400, response.getMessage());
            }

            MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();

            if(myDataCardPayList == null) return;

//            log.debug("myDataCardPayList : "+ myDataCardPayList);

            BigInteger totalConsumption= BigInteger.ZERO;

            // 소비 통계 id를 대분류 통계가 참고하고 대분류 통계 id를 소분류 통계가 참고하는데
            // 그럴려면 소비 통계에 데이터가 먼저 저장돼있어야 대분류 통계가 참고
            // 소비 통계 먼저 저장해놔야.. 통계 먼저 저장 때리자

            // 소비 통계
//            ConsumptionStaticEntity consumptionStaticEntity = consumptionStaticRepository.findByUserCard(userCardId);
//            consumptionStaticRepository.save(new ConsumptionStaticEntity(
//                    userCardId, year, month, totalConsumption)
//            );

            // 해당 달 모든 거래내역
            for(int j=0; j<myDataCardPayList.getMyDataCardHistoryList().size(); j++){

                // 소비 통계의 총 소비 내역 먼저 계산
                totalConsumption = totalConsumption.add(BigInteger.valueOf(myDataCardPayList.getMyDataCardHistoryList().get(j).getApprovedAmt()));

            }
            consumptionStaticRepository.save(new ConsumptionStaticEntity(
                userCardId, year, month, totalConsumption));
//            if (consumptionStaticEntity == null){
//                consumptionStaticRepository.save(new ConsumptionStaticEntity(
//                        userCardId, year, month, totalConsumption)
//                );
//            }

            ConsumptionStaticEntity consumptionStaticEntity = consumptionStaticRepository.findByUserCardAndMonth(userCardId, month);
            int consumptionStaticId = consumptionStaticEntity.getConsumptionStaticId();
//            System.out.println("consumptionStaticId " +consumptionStaticId);

            // method로 뺄까..
            for(int j=0; j<myDataCardPayList.getMyDataCardHistoryList().size(); j++) {

                int largeCategoryId = myDataCardPayList.getMyDataCardHistoryList().get(j).getLargeCategoryId();
                int smallCategoryId = myDataCardPayList.getMyDataCardHistoryList().get(j).getSmallCategoryId();

                // 소비 금액 (Large) / 소비 통계 ID에 속하면서 대분류 Id에 맞는 데이터 갖고옴
                ConsumptionLargeStaticEntity consumptionLargeStaticEntity =
                    consumptionLargeStaticRepository.findByConsumptionStaticIdAndLargeCategoryId(
                        consumptionStaticId, largeCategoryId).orElse(null);

                if(consumptionLargeStaticEntity == null){
                    consumptionLargeStaticRepository.save(new ConsumptionLargeStaticEntity(
                        consumptionStaticId, largeCategoryId, BigInteger.ZERO, 0
                    ));
                }

                consumptionLargeStaticEntity =
                    consumptionLargeStaticRepository.findByConsumptionStaticIdAndLargeCategoryId(
                        consumptionStaticId, largeCategoryId).orElse(null);
//                log.debug("consumptionLargeStaticEntity2 " +consumptionLargeStaticEntity);

                // 빅인티저..
                BigInteger consumptionAmount = consumptionLargeStaticEntity.getConsumptionAmount(); // 라지에 있던 금액

                // 결재 내역에 가져온 금액
                BigInteger amount = BigInteger.valueOf(myDataCardPayList.getMyDataCardHistoryList().get(j).getApprovedAmt());

                // 금액 추가
                consumptionLargeStaticEntity.setConsumptionAmount((consumptionAmount.add(amount)));

                // 횟수 증가
                int consumptionCount = consumptionLargeStaticEntity.getConsumptionCount();
                consumptionLargeStaticEntity.setConsumptionCount(consumptionCount + 1);
                consumptionLargeStaticEntity.setLargeCategoryId(largeCategoryId);
//                log.debug("consumptionLargeStaticEntity "+ consumptionLargeStaticEntity);

                // 중분류 카테고리에
                consumptionLargeStaticRepository.save(consumptionLargeStaticEntity);

                int consumptionLargeStaticId = consumptionLargeStaticEntity.getConsumptionLargeStaticId();

                // 소비 금액 내역 (Small)
                saveConsumptionSmall(consumptionLargeStaticId, smallCategoryId, amount);
            }
        }
    }

    public void saveConsumptionSmall(int consumptionLargeStaticId, int smallCategoryId, BigInteger amount){

        ConsumptionSmallStaticEntity smallStaticEntity =
            consumptionSmallStaticRepository.findByConsumptionLargeStaticIdAndSmallCategoryId(
                consumptionLargeStaticId,smallCategoryId);

        if (smallStaticEntity == null){
            consumptionSmallStaticRepository.save(new ConsumptionSmallStaticEntity(
                consumptionLargeStaticId, smallCategoryId, BigInteger.ZERO, 0
            ));
        }

        smallStaticEntity =
            consumptionSmallStaticRepository.findByConsumptionLargeStaticIdAndSmallCategoryId(
                consumptionLargeStaticId, smallCategoryId);

        BigInteger consumptionAmount = smallStaticEntity.getConsumption();
        int count = smallStaticEntity.getConsumptionCount();

        smallStaticEntity.setConsumption(consumptionAmount.add(amount));
        smallStaticEntity.setConsumptionCount(count+1);
        smallStaticEntity.setSmallCategoryId(smallCategoryId);

        consumptionSmallStaticRepository.save(smallStaticEntity);
    }

}
