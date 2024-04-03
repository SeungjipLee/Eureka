package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.*;
import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest.RegistUserCard;
import com.ssafy.eureka.domain.card.dto.response.*;
import com.ssafy.eureka.domain.card.dto.response.CardRecommendMainResponse.CategoryCard;
import com.ssafy.eureka.domain.card.dto.response.CardRecommendMainResponse.DdoraeCard;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse.MyDataCard;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse.MyDataCard.Card;
import com.ssafy.eureka.domain.card.repository.*;
import com.ssafy.eureka.domain.card.util.AsyncUserCardStaticsUtil;
import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import com.ssafy.eureka.domain.category.repository.LargeCategoryRepository;
import com.ssafy.eureka.domain.mydata.dto.MyDataToken;
import com.ssafy.eureka.domain.card.dto.request.SearchUserCardRequest;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse.MyDataCardHistory;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataUserCardResponse;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataUserCardResponse.MyDataUserCard;
import com.ssafy.eureka.domain.mydata.feign.MyDataFeign;
import com.ssafy.eureka.domain.pay.repository.PayHistoryRepository;
import com.ssafy.eureka.domain.payment.dto.request.PayTokenRequest;
import com.ssafy.eureka.domain.payment.dto.response.PayTokenResponse;
import com.ssafy.eureka.domain.payment.feign.PaymentFeign;
import com.ssafy.eureka.domain.statistics.dto.CardOwnershipDto;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionLargeStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionSmallStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.ConsumptionStaticEntity;
import com.ssafy.eureka.domain.statistics.entity.DiscountStaticEntity;
import com.ssafy.eureka.domain.statistics.repository.CardOwnershipStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionLargeStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionSmallStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.ConsumptionStaticRepository;
import com.ssafy.eureka.domain.statistics.repository.DiscountStaticRepository;
import com.ssafy.eureka.domain.user.dto.UserEntity;
import com.ssafy.eureka.domain.user.dto.UserInfoDto;
import com.ssafy.eureka.domain.user.repository.UserRepository;
import com.ssafy.eureka.util.UserUtil;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;

import java.math.BigInteger;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.*;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class UserCardServiceImpl implements UserCardService {

    private final MydataTokenRepository mydataTokenRepository;
    private final UserCardRepository userCardRepository;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;
    private final CardCompanyRepository cardCompanyRepository;
    private final CardBenefitDetailRepository cardBenefitDetailRepository;
    private final CardBenefitRepository cardBenefitRepository;
    private final LargeCategoryRepository largeCategoryRepository;
    private final PayHistoryRepository payHistoryRepository;
    private final ConsumptionStaticRepository consumptionStaticRepository;
    private final ConsumptionLargeStaticRepository consumptionLargeStaticRepository;
    private final ConsumptionSmallStaticRepository consumptionSmallStaticRepository;
    private final DiscountStaticRepository discountStaticRepository;

    private final MyDataFeign myDataFeign;
    private final PaymentFeign paymentFeign;
    private final AsyncUserCardStaticsUtil asyncUserCardStaticsUtil;

    private final CardOwnershipStaticRepository cardOwnershipStaticRepository;

    private Map<Integer, String> cardCompany;

    @PostConstruct
    public void initCardCompany() {
        this.cardCompany = new HashMap<>();
        List<CardCompanyEntity> list = cardCompanyRepository.findAll();
        for (CardCompanyEntity comp : list) {
            cardCompany.put(comp.getCardCompanyId(), comp.getCompanyName());
        }
    }

    @Override
    public MyDataCardListResponse searchUserCard(String userId,
        SearchUserCardRequest searchUserCardRequest) {
        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        List<MyDataCard> list = new ArrayList<>();

        for (Integer comp : searchUserCardRequest.getCardCompayList()) {
            String cardCompanyName = cardCompany.get(comp);

            MyDataApiResponse<?> response = myDataFeign.searchUserCard(accessToken, comp);

            if (response.getStatus() != 200) {
                throw new CustomException(400, response.getMessage());
            }

            MyDataUserCardResponse myDataUserCardResponse = (MyDataUserCardResponse) response.getData();

            List<Card> cardList = new ArrayList<>();
            for (MyDataUserCard card : myDataUserCardResponse.getUserCardList()) {
                CardEntity cardEntity = cardRepository.findByCardId(card.getCardId());

                Card c = new Card(card.getCardId(), card.getCardIdentifier(),
                    cardEntity.getCardName(), cardEntity.getImagePath(), cardEntity.getImgAttr());
                cardList.add(c);
            }
            list.add(new MyDataCard(comp, cardCompanyName, cardList));
        }

        MyDataCardListResponse res = new MyDataCardListResponse();
        res.setCardList(list);

        return res;
    }

    @Override
    public List<OwnUserCardResponse> ownUserCardList(String userId) {
        List<OwnUserCardResponse> registerCardList = new ArrayList<>();
        List<CardDetailBenefitList> cardDetailBenefitList;

        // 현재 로그인한 유저의 보유카드 조회
        List<UserCardEntity> userCardEntityList = userCardRepository.findAllByUserId(
            Integer.parseInt(userId));
        if (userCardEntityList == null) {
            throw new CustomException(ResponseCode.USER_CARD_NOT_FOUND);
        }

        for (int i = 0; i < userCardEntityList.size(); i++) {

            cardDetailBenefitList = new ArrayList<>();
            int cardId = userCardEntityList.get(i).getCardId();

            // 카드 Entity 가져와서 카드 이름, 이미지
            CardEntity cardEntity = cardRepository.findByCard(cardId)
                .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

            String cardName = cardEntity.getCardName();
            String imagePath = cardEntity.getImagePath();
            int imageAttr = cardEntity.getImgAttr();

            // 카드 id로 카드 혜택들 가져오기
            // 한 카드에 혜택 3개만 보여줄거야, 첫 번째 혜택의 첫 번째 상세혜택 -> 총 3개
            List<CardBenefitEntity> cardBenefitEntityList = cardBenefitRepository.findByCardId(
                cardId);

            for (int j = 0; j < cardBenefitEntityList.size(); j++) {

                int cardBenefitId = cardBenefitEntityList.get(j).getCardBenefitId();

                // 카드 혜택 id로 카드 상세 혜택들 가져오기
                List<CardBenefitDetailEntity> cardBenefitDetailEntityList = cardBenefitDetailRepository.findByCardBenefitId(
                    cardBenefitId);

                // 혜택은 있지만 상세 혜택 테이블에서 혜택 번호가 없는 경우
                if (cardBenefitDetailEntityList.isEmpty()) {
                    continue;
                }

                String discountType = cardBenefitDetailEntityList.get(0).getDiscountCostType();
                double discountCost = cardBenefitDetailEntityList.get(0).getDiscountCost();
                int largeCategoryId = cardBenefitDetailEntityList.get(0).getLargeCategoryId();

                LargeCategoryEntity largeCategoryEntity = largeCategoryRepository.findByLargeCategoryId(
                    largeCategoryId);
                String largeCategoryName = largeCategoryEntity.getCategoryName();

                // 한 혜택의 첫 번째 상세 혜택에서 할인 타입, 할인 비용, 카테고리 이름만 담기
                cardDetailBenefitList.add(
                    new CardDetailBenefitList(discountType, discountCost, largeCategoryName));

                if (cardDetailBenefitList.size() == 3) {
                    break;
                }

            } // cardBenefit

            registerCardList.add(
                new OwnUserCardResponse(userCardEntityList.get(i), imagePath, cardName, imageAttr,
                    cardDetailBenefitList));
        }// cardEntity

        return registerCardList;
    }

    @Override
    public List<PayUserCardResponse> payUserCardList(String userId, String yyyymm) {

        List<PayUserCardResponse> payUserCardResponseList = new ArrayList<>();
        List<UserCardEntity> userCardEntityList =
            userCardRepository.findAllByUserIdAndIsPaymentEnabledTrue(Integer.parseInt(userId));
        if (userCardEntityList.isEmpty()) {
            return payUserCardResponseList;
        }

        // 로그인한 유저의 모든 결제 카드
        for (UserCardEntity userCardEntity : userCardEntityList) {

            int totalAmt = 0;

            MyDataToken myDataToken = mydataTokenRepository.findById(userId)
                .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

            String accessToken = myDataToken.getAccessToken();

            MyDataApiResponse<?> response = myDataFeign.searchCardPayList(accessToken,
                userCardEntity.getCardIdentifier(), yyyymm);

            if (response.getStatus() != 200) {
                throw new CustomException(400, response.getMessage());
            }

            MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();

            log.debug("myDataCardPayList : " + myDataCardPayList);

            for (int i = 0; i < myDataCardPayList.getMyDataCardHistoryList().size(); i++) {
                totalAmt += myDataCardPayList.getMyDataCardHistoryList().get(i).getApprovedAmt();
            }

            int userCardId = userCardEntity.getUserCardId();
            int cardId = userCardEntity.getCardId();
            String firstCardNumber = userCardEntity.getFirstCardNumber();
            String lastCardNumber = userCardEntity.getLastCardNumber();

            CardEntity cardEntity = cardRepository.findByCard(cardId)
                .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

            int previousPerformance = cardEntity.getPreviousPerformance();
            String cardName = cardEntity.getCardName();
            String imagePath = cardEntity.getImagePath();
            int imgAttr = cardEntity.getImgAttr();
            int cardType = cardEntity.getCardType();
            int cardCompanyId = cardEntity.getCardCompanyId();

            CardCompanyEntity cardCompanyEntity = cardCompanyRepository.findByCardCompanyId(
                cardCompanyId);
            String cardCompanyName = cardCompanyEntity.getCompanyName();

            payUserCardResponseList.add(new PayUserCardResponse(
                userCardId, Integer.parseInt(userId),
                cardId, cardName, previousPerformance,
                firstCardNumber, lastCardNumber, imagePath, imgAttr,
                cardType, cardCompanyName, totalAmt));
        }
        return payUserCardResponseList;
    }

    @Override
    public CardInfoResponse userCardInfo(int userCardId) {

        LocalDate currentDate = LocalDate.now();

        // 현재 연도와 월 가져오기
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue(); // 작년..

        String year = String.format("%d", currentYear);
        String month = String.format("%02d", currentMonth);

        UserCardEntity userCardEntity = userCardRepository.findByUserCardId(userCardId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        boolean isPaymentEnabled = userCardEntity.isPaymentEnabled();
        int cardId = userCardEntity.getCardId();

        CardEntity cardEntity = cardRepository.findByCardId(cardId);
        String cardName = cardEntity.getCardName();
        int cardType = cardEntity.getCardType();
        int previousPerformance = cardEntity.getPreviousPerformance();
        String imagePath = cardEntity.getImagePath();
        int imgAttr = cardEntity.getImgAttr();

        return new CardInfoResponse(userCardId, cardId, cardName, cardType, previousPerformance,
            isPaymentEnabled, imagePath, imgAttr);
    }

    @Override
    public MyDataCardHistoryResponse listCardHistory(String userId, int userCardId, String yyyymm) {
        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        int intUserId = Integer.parseInt(userId);

        UserEntity userEntity = userRepository.findByUserId(intUserId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        UserCardEntity userCardEntity = userCardRepository.findByUserCardId(userCardId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        MyDataApiResponse<?> response = myDataFeign.searchCardPayList(accessToken,
            userCardEntity.getCardIdentifier(), yyyymm);

        if (response.getStatus() != 200) {
            throw new CustomException(400, response.getMessage());
        }

        MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();
        // 총 결제 금액, 할인 금액 넣어서 리턴하기

        int totalDiscount = 0;

        ConsumptionStaticEntity consumptionStatic = consumptionStaticRepository.findByUserCardIdAndYearAndMonth(
                userCardId, yyyymm.substring(0, 4), yyyymm.substring(4, 6))
            .orElse(null);

        DiscountStaticEntity discountStatic = discountStaticRepository.findByUserCardIdAndYearAndMonth(
                userCardId, yyyymm.substring(0, 4), yyyymm.substring(4, 6))
            .orElse(null);

        myDataCardPayList.setMonthTotalConsumption(
            consumptionStatic != null ? consumptionStatic.getTotalConsumption().intValue() : 0);
        myDataCardPayList.setMonthTotalDiscount(
            discountStatic != null ? discountStatic.getTotalDiscount() : 0);

        return myDataCardPayList;
    }

    @Override
    public void registUserCard(String userId, RegistUserCardRequest registUserCardRequest
    ) {
        long startTime = System.currentTimeMillis();

        for (RegistUserCard userCard : registUserCardRequest.getRegisterUserCard()) {
            UserCardEntity card = userCardRepository.findByCardIdentifier(
                    userCard.getCardIdentifier())
                .orElse(null);

            if (card == null) {
                UserCardEntity newCard = UserCardEntity.registUserCard(userId, userCard);
                userCardRepository.save(newCard);

                asyncUserCardStaticsUtil.asyncStaticMethod(userId, userCard.getCardIdentifier());
            }
        }

        long endTime = System.currentTimeMillis();

        log.debug("카드 등록 완료, time : " + (endTime - startTime));
    }


    @Override
    public void deleteUserCard(String userId, int userCardId) {
        UserCardEntity userCard = userCardRepository.findByUserCardId(userCardId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        // 카드 삭제 여부 / 등록 및 재 등록 .......
        userCardRepository.delete(userCard);
    }

    @Transactional
    @Override
    public void registPayCard(String userId, RegistPayCardRequest registPayCardRequest) {
        long startTime = System.currentTimeMillis();

        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        MyDataApiResponse<?> response = paymentFeign.requestPayToken(accessToken,
            new PayTokenRequest(registPayCardRequest));
        log.debug("response : " + response);

        if (response.getStatus() != 200) {
            throw new CustomException(400, response.getMessage());
        }

        PayTokenResponse payTokenResponse = (PayTokenResponse) response.getData();

        UserCardEntity userCard = userCardRepository.findByCardIdentifier(
                payTokenResponse.getCardIdentifier())
            .orElse(null);

        if (userCard != null) {
            userCard.registPayCard(registPayCardRequest, payTokenResponse);
            log.debug("이미 등록된 카드");
        } else {
            UserCardEntity card = new UserCardEntity(Integer.parseInt(userId), registPayCardRequest,
                payTokenResponse);
            userCardRepository.save(card);
            asyncUserCardStaticsUtil.asyncStaticMethod(userId,
                payTokenResponse.getCardIdentifier());
            long endTime = System.currentTimeMillis();
            log.debug("카드 등록 완료, time : " + (endTime - startTime));
        }
    }

    @Override
    public CardProdRecommendResponse cardProdRecommend(String userId, int userCardId) {

        UserCardEntity userCardEntity = userCardRepository.findByUserCardId(userCardId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        LocalDate lastMonth = LocalDate.now().minusMonths(1);

        String year = lastMonth.format(DateTimeFormatter.ofPattern("yyyy"));
        String month = lastMonth.format(DateTimeFormatter.ofPattern("MM"));

        // 한 달 전 내역으로 추천해줄 것
        ConsumptionStaticEntity consumptionStaticEntity = consumptionStaticRepository.findByUserCardAndMonth(
            userCardId, month);
        log.debug("userCardId : " + userCardId + " month : " + month);
        if (consumptionStaticEntity == null) {
            throw new CustomException(ResponseCode.INVALID_YEAR_MONTH);
        }

        int consumptionStaticId = consumptionStaticEntity.getConsumptionStaticId();

        ConsumptionLargeStaticEntity consumptionLargeStaticEntity = consumptionLargeStaticRepository
            .findTop1ByConsumptionStaticIdOrderByConsumptionAmountDesc(consumptionStaticId);
        log.debug("consumptionLargeStaticEntity " + consumptionLargeStaticEntity);
        System.out.println("Size : " + consumptionLargeStaticEntity);

        int largeCategoryId = consumptionLargeStaticEntity.getLargeCategoryId();

        CardBenefitDetailEntity cardBenefitDetailEntity = cardBenefitDetailRepository.
            findTopByLargeCategoryIdOrderByDiscountCostDesc(largeCategoryId);

        int benefitId = cardBenefitDetailEntity.getCardBenefitId();

        String yyyymm = year + month;

        // 거래 내역 S
        MyDataApiResponse<?> response = myDataFeign.searchCardPayList(accessToken,
            userCardEntity.getCardIdentifier(), yyyymm);

        if (response.getStatus() != 200) {
            throw new CustomException(400, response.getMessage());
        }

        MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();

        double totalAmt = 0;
        double afterDiscount = 0;
        String discountCostType = cardBenefitDetailEntity.getDiscountCostType();
        for (int i = 0; i < myDataCardPayList.getMyDataCardHistoryList().size(); i++) {
            totalAmt += myDataCardPayList.getMyDataCardHistoryList().get(i).getApprovedAmt();

            if (discountCostType.equals("원")) {
                afterDiscount +=
                    myDataCardPayList.getMyDataCardHistoryList().get(i).getApprovedAmt()
                        - cardBenefitDetailEntity.getDiscountCost();
            } else if (discountCostType.equals("%")) {
                afterDiscount +=
                    myDataCardPayList.getMyDataCardHistoryList().get(i).getApprovedAmt() -
                        (myDataCardPayList.getMyDataCardHistoryList().get(i).getApprovedAmt()
                            * (cardBenefitDetailEntity.getDiscountCost()) / 100);
            }
        }

        // 거래 내역 E

        DiscountStaticEntity discountStatic = discountStaticRepository.findByUserCardIdAndYearAndMonth(
                userCardId, year, month)
            .orElse(null);
        int discount = discountStatic == null ? 0 : discountStatic.getTotalDiscount();

        CardBenefitEntity cardBenefitEntity = cardBenefitRepository.findFirstByCardBenefitId(
            benefitId);

        int cardId = cardBenefitEntity.getCardId();

        CardEntity cardEntity = cardRepository.findByCard(cardId)
            .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

        return new CardProdRecommendResponse(cardEntity, (int) totalAmt - (int) afterDiscount);
    }

    @Override
    public CardCompareResponse cardProdCompare(String userId, int userCardId) {

        UserCardEntity userCardEntity = userCardRepository.findByUserCardId(userCardId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        int cardId = userCardEntity.getCardId();

        // 내가 고른 카드
        CardEntity cardEntity1 = cardRepository.findByCardId(cardId);

        // 카상추 로직
        LocalDate currentDate = LocalDate.now();

        // 현재 연도와 월 가져오기
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue(); // 작년..

        LocalDate beforeDate = LocalDate.now().minusMonths(1);

        String year = beforeDate.format(DateTimeFormatter.ofPattern("yyyy"));
        String month = beforeDate.format(DateTimeFormatter.ofPattern("MM"));

        // 한 달 전 내역으로 추천해줄 것
        ConsumptionStaticEntity consumptionStaticEntity = consumptionStaticRepository.findByUserCardAndMonth(
            userCardId, month);
        log.debug("userCardId : " + userCardId + " month : " + month);
        if (consumptionStaticEntity == null) {
            throw new CustomException(ResponseCode.INVALID_YEAR_MONTH);
        }

        int consumptionStaticId = consumptionStaticEntity.getConsumptionStaticId();

        ConsumptionLargeStaticEntity consumptionLargeStaticEntity = consumptionLargeStaticRepository
            .findTop1ByConsumptionStaticIdOrderByConsumptionAmountDesc(consumptionStaticId);

        int largeCategoryId = consumptionLargeStaticEntity.getLargeCategoryId();

        CardBenefitDetailEntity cardBenefitDetailEntity = cardBenefitDetailRepository.
            findTopByLargeCategoryIdOrderByDiscountCostDesc(largeCategoryId);

        int benefitId = cardBenefitDetailEntity.getCardBenefitId();

        CardBenefitEntity cardBenefitEntity = cardBenefitRepository.findFirstByCardBenefitId(
            benefitId);

        cardId = cardBenefitEntity.getCardId();

        //
        UserInfoDto userInfo = userRepository.findUserInfoByUserId(Integer.parseInt(userId));
        char ageGroup = UserUtil.calculateAgeGroup(userInfo.getUserBirth(),
            userInfo.getUserGender());
        LocalDate date = cardOwnershipStaticRepository.findLatestCreatedDate();

        List<CardOwnershipDto> cardOwnershipStaticList =
            cardOwnershipStaticRepository.findCardOwnershipStaticByAgeGroup(ageGroup, date);

        // 또래 카드
        CardEntity cardEntity2 = cardRepository.findByCard(
                cardOwnershipStaticList.get(0).getCardId())
            .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

        // 카상추 카드
        CardEntity cardEntity3 = cardRepository.findByCard(cardId)
            .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

        DiscountStaticEntity discountStatic = discountStaticRepository.findByUserCardIdAndYearAndMonth(
                userCardId, year, month)
            .orElse(null);

        int discount = discountStatic == null ? 0 : discountStatic.getTotalDiscount();

        int discount2 = 0;
        int discount3 = 0;

        if (discount == 0) {
            discount2 = 2000;
            discount3 = 1000;
        } else if (discount < 1000) {
            discount2 = discount * 2;
            discount3 = discount;
        } else {
            discount2 = ((int) (discount * 1.5) / 100) * 100;
            discount3 = ((int) (discount * 1.3) / 100) * 100;
        }

        CardCompareResponse cardCompareResponse = new CardCompareResponse(cardEntity1, discount,
            cardEntity2, discount2, cardEntity3, discount3);

        return cardCompareResponse;
    }

    @Override
    public CardRecommendTop3 cardRecommendTop3(String userId, int userCardId) {

        UserCardEntity userCardEntity = userCardRepository.findByUserCardId(userCardId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        int cardId = userCardEntity.getCardId();

        // 내 카드
        CardEntity cardEntity1 = cardRepository.findByCardId(cardId);
        String cardName = cardEntity1.getCardName();
        String imagePath = cardEntity1.getImagePath();
        int imgAttr = cardEntity1.getImgAttr();

        List<CardRecommendTop3List> top3List = new ArrayList<>();

        // 추천 카드 3개 받기
        LocalDate currentDate = LocalDate.now();

        // 현재 연도와 월 가져오기
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue();

        String year = String.format("%d", currentYear);
        String month = String.format("%02d", currentMonth - 1);

        String yyyymm = year + month;

        // 한 달 전 내역으로 추천해줄 것
        ConsumptionStaticEntity consumptionStaticEntity = consumptionStaticRepository.findByUserCardAndMonth(
            userCardId, month);
        log.debug("userCardId : " + userCardId + " month : " + month);
        if (consumptionStaticEntity == null) {
            throw new CustomException(ResponseCode.INVALID_YEAR_MONTH);
        }

        int consumptionStaticId = consumptionStaticEntity.getConsumptionStaticId();

        List<ConsumptionLargeStaticEntity> consumptionLargeStaticEntity = consumptionLargeStaticRepository
            .findTop3ByConsumptionStaticIdOrderByConsumptionAmountDesc(consumptionStaticId);

        List<Top3ListAndLargeCategoryNameResponse> tlcnrList = new ArrayList<>();

        // 상위 3개 카테고리 돌려
        for (int i = 0; i < consumptionLargeStaticEntity.size(); i++) {

            top3List = new ArrayList<>();
            int largeCategoryId = consumptionLargeStaticEntity.get(i).getLargeCategoryId();

            List<CardBenefitDetailEntity> cardBenefitDetailEntityList = cardBenefitDetailRepository.
                findTop3ByLargeCategoryIdOrderByDiscountCostDesc(largeCategoryId);

            String largeCategoryName = "";

            for (int j = 0; j < cardBenefitDetailEntityList.size(); j++) {

                int benefitId = cardBenefitDetailEntityList.get(j).getCardBenefitId();
                log.debug("cardBenefitDetailEntityList.get(j).getCardBenefitId() : "
                    + cardBenefitDetailEntityList.get(j).getCardBenefitId());

                CardBenefitEntity cardBenefitEntity = cardBenefitRepository.findFirstByCardBenefitId(
                    benefitId);

                cardId = cardBenefitEntity.getCardId();
                String info = cardBenefitEntity.getInfo();

                MyDataApiResponse<?> response = myDataFeign.searchCardPayList(accessToken,
                    userCardEntity.getCardIdentifier(), yyyymm);

                if (response.getStatus() != 200) {
                    throw new CustomException(400, response.getMessage());
                }

                MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();

                DiscountStaticEntity discountStatic = discountStaticRepository.findByUserCardIdAndYearAndMonth(userCardId, year, month)
                    .orElse(null);
                int discount = discountStatic == null ? 0 : discountStatic.getTotalDiscount();

                int maxDiscount = cardBenefitDetailEntityList.get(j).getDiscountLimit();

                CardEntity cardEntity2 = cardRepository.findByCardId(cardId);
                LargeCategoryEntity largeCategoryEntity = largeCategoryRepository.findByLargeCategoryId(
                    largeCategoryId);

                int cardId2 = cardEntity2.getCardId();
                String cardName2 = cardEntity2.getCardName();
                String imagePath2 = cardEntity2.getImagePath();
                int imgAttr2 = cardEntity2.getImgAttr();
                largeCategoryName = largeCategoryEntity.getCategoryName();
                log.debug("상위 카테고리 : " + largeCategoryName);

                int discountType = cardBenefitDetailEntityList.get(j).getDiscountType();
                double discountCost = cardBenefitDetailEntityList.get(j).getDiscountCost();
                int afterDiscount = maxDiscount - discount;
                if(afterDiscount < 0) afterDiscount *= -1;
                if(afterDiscount > 20000) afterDiscount = 20000;
                top3List.add(
                    new CardRecommendTop3List(cardId2, cardName2, info, imagePath2, imgAttr2,
                        discountType, discountCost, discount - maxDiscount));
            }
            tlcnrList.add(new Top3ListAndLargeCategoryNameResponse(largeCategoryName, top3List));
        }

        return new CardRecommendTop3(cardId, cardName, imagePath, imgAttr, tlcnrList);

    }

    @Override
    public CardRecommendMainResponse cardRecommendMain(String userId, int userCardId) {
        UserCardEntity userCardEntity = userCardRepository.findByUserCardId(userCardId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        int cardId = userCardEntity.getCardId();

        // 내가 고른 카드
        CardEntity cardEntity1 = cardRepository.findByCardId(cardId);

        // 카상추 로직
        LocalDate currentDate = LocalDate.now();

        // 현재 연도와 월 가져오기
        int currentYear = currentDate.getYear();
        int currentMonth = currentDate.getMonthValue(); // 작년..

        LocalDate beforeDate = LocalDate.now().minusMonths(1);

        String year = beforeDate.format(DateTimeFormatter.ofPattern("yyyy"));
        String month = beforeDate.format(DateTimeFormatter.ofPattern("MM"));

        // 한 달 전 내역으로 추천해줄 것
        ConsumptionStaticEntity consumptionStaticEntity = consumptionStaticRepository.findByUserCardAndMonth(
            userCardId, month);
        log.debug("userCardId : " + userCardId + " month : " + month);
        if (consumptionStaticEntity == null) {
            throw new CustomException(ResponseCode.INVALID_YEAR_MONTH);
        }

        int consumptionStaticId = consumptionStaticEntity.getConsumptionStaticId();

        ConsumptionLargeStaticEntity consumptionLargeStaticEntity = consumptionLargeStaticRepository
            .findTop1ByConsumptionStaticIdOrderByConsumptionAmountDesc(consumptionStaticId);

        int largeCategoryId = consumptionLargeStaticEntity.getLargeCategoryId();

        LargeCategoryEntity largeCategoryEntity = largeCategoryRepository.findByLargeCategoryId(largeCategoryId);

        CardBenefitDetailEntity cardBenefitDetailEntity = cardBenefitDetailRepository.
            findTopByLargeCategoryIdOrderByDiscountCostDesc(largeCategoryId);

        int benefitId = cardBenefitDetailEntity.getCardBenefitId();

        CardBenefitEntity cardBenefitEntity = cardBenefitRepository.findFirstByCardBenefitId(
            benefitId);

        cardId = cardBenefitEntity.getCardId();

        //
        UserInfoDto userInfo = userRepository.findUserInfoByUserId(Integer.parseInt(userId));
        char ageGroup = UserUtil.calculateAgeGroup(userInfo.getUserBirth(),
            userInfo.getUserGender());
        LocalDate date = cardOwnershipStaticRepository.findLatestCreatedDate();

        List<CardOwnershipDto> cardOwnershipStaticList =
            cardOwnershipStaticRepository.findCardOwnershipStaticByAgeGroup(ageGroup, date);

        // 또래 카드
        CardEntity cardEntity2 = cardRepository.findByCard(
                cardOwnershipStaticList.get(0).getCardId())
            .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

        // 카상추 카드
        CardEntity cardEntity3 = cardRepository.findByCard(cardId)
            .orElseThrow(() -> new CustomException(ResponseCode.CARD_NOT_FOUND));

        DiscountStaticEntity discountStatic = discountStaticRepository.findByUserCardIdAndYearAndMonth(
                userCardId, year, month)
            .orElse(null);

        int discount = discountStatic == null ? 0 : discountStatic.getTotalDiscount();

        CardRecommendMainResponse cardRecommendMainResponse = new CardRecommendMainResponse(
            new CategoryCard(
                largeCategoryEntity.getCategoryName(),
                cardEntity2.getCardId(),
                cardEntity2.getCardName(),
                cardEntity2.getImagePath(),
                cardEntity2.getImgAttr(),
                discount,
                discount == 0 ? 2000 : discount < 1000 ? discount * 2 : ((int) (discount * 1.5) / 100) * 100
            ),
            new DdoraeCard(
                2,
                cardEntity3.getCardId(),
                cardEntity3.getCardName(),
                cardEntity3.getImagePath(),
                cardEntity3.getImgAttr(),
                discount,
                discount == 0 ? 1000 : discount < 1000 ? discount : ((int) (discount * 1.3) / 100) * 100
            )
        );

        return cardRecommendMainResponse;
    }
}