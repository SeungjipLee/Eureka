package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.*;
import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest.RegistUserCard;
import com.ssafy.eureka.domain.card.dto.response.*;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse.MyDataCard;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse.MyDataCard.Card;
import com.ssafy.eureka.domain.card.repository.*;
import com.ssafy.eureka.domain.category.dto.LargeCategoryEntity;
import com.ssafy.eureka.domain.category.repository.LargeCategoryRepository;
import com.ssafy.eureka.domain.mydata.dto.MyDataToken;
import com.ssafy.eureka.domain.card.dto.request.SearchUserCardRequest;
import com.ssafy.eureka.domain.mydata.dto.request.MyDataCardHistoryRequest;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataUserCardResponse;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataUserCardResponse.MyDataUserCard;
import com.ssafy.eureka.domain.mydata.feign.MyDataFeign;
import com.ssafy.eureka.domain.payment.dto.request.PayTokenRequest;
import com.ssafy.eureka.domain.payment.dto.response.PayTokenResponse;
import com.ssafy.eureka.domain.payment.feign.PaymentFeign;
import com.ssafy.eureka.domain.user.dto.UserEntity;
import com.ssafy.eureka.domain.user.repository.UserRepository;
import jakarta.annotation.PostConstruct;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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

    private final MyDataFeign myDataFeign;
    private final PaymentFeign paymentFeign;

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
                throw new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR);
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
        List<CardDetailBenefitList> cardDetailBenefitList = new ArrayList<>();
        // 현재 로그인한 유저의 보유카드 조회
        List<UserCardEntity> userCardEntityList = userCardRepository.findAllByUserIdAndIsPaymentEnabled(Integer.parseInt(userId));
        if(userCardEntityList == null) throw new CustomException(ResponseCode.USER_CARD_NOT_FOUND);

        System.out.println("내가 가진 카드 갯수 : " + userCardEntityList.size());
        for(int i=0; i<userCardEntityList.size(); i++){

            System.out.println("현재 카드 Id: " +userCardEntityList.get(i).getCardId());
            int cardId = userCardEntityList.get(i).getCardId();
            // 카드 Entity 가져와서 카드 이름, 이미지
            CardEntity cardEntity = cardRepository.findByCard(cardId)
                    .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

            String cardName = cardEntity.getCardName();
            String imagePath = cardEntity.getImagePath();
            int imageAttr = cardEntity.getImgAttr();

            // 카드 id로 카드 혜택들 가져오기, 한 카드에 혜택 3개만 보여줄거야
            // 혜택이 3개가 안되는 경우도 고려
            List<CardBenefitEntity> cardBenefitEntityList = cardBenefitRepository.findByCardId(cardId);
            System.out.println("cardBenefitEntityList");

            if(cardBenefitEntityList.size() == 0 || cardBenefitEntityList == null) continue;
            int cardBenefitCnt=0;
            for(int j=0; j<cardBenefitEntityList.size(); j++){

            int cardBenefitId = cardBenefitEntityList.get(j).getCardBenefitId();
                System.out.println("현재 유저: "+ userId);
                System.out.println("카드 Id : "+cardBenefitEntityList.get(j).getCardId());
                System.out.println("카드 혜택 Id : "+cardBenefitEntityList.get(j).getCardBenefitId());
            System.out.println("카드 혜택 타이틀 : "+cardBenefitEntityList.get(j).getTitle());
                if(cardBenefitEntityList.get(j) == null) continue;

            // 카드 혜택 id로 카드 상세 혜택들 가져오기
            List<CardBenefitDetailEntity> cardBenefitDetailEntityList = cardBenefitDetailRepository.findByCardBenefitId(cardBenefitId);
                System.out.println("cardBenefitDetailEntityList Size : "+ cardBenefitDetailEntityList.size());
                if(cardBenefitDetailEntityList.size() == 0 || cardBenefitDetailEntityList == null) continue;
                System.out.println(cardBenefitDetailEntityList.get(0).getCardBenefitId());

            boolean put = false; // 상세 혜택 하나만 넣어줄거야
            for(int k=0; k<cardBenefitDetailEntityList.size(); k++){
//                if(cardDetailBenefitList.get(k) == null) continue;
                put = true;
                System.out.println("cardBenefitDetail Id : "+ cardBenefitDetailEntityList.get(k).getCardBenefitDetailId());
                String discountType = cardBenefitDetailEntityList.get(k).getDiscountCostType();
                float discountCost = cardBenefitDetailEntityList.get(k).getDiscountCost();
                int largeCategoryId = cardBenefitDetailEntityList.get(k).getLargeCategoryId();

                LargeCategoryEntity largeCategoryEntity = largeCategoryRepository.findByLargeCategoryId(largeCategoryId);
                String largeCategoryName = largeCategoryEntity.getCategoryName();

                cardDetailBenefitList.add(new CardDetailBenefitList(discountType, discountCost, largeCategoryName));
                if(put) break;

            }
                if(cardDetailBenefitList.size() == 3) break;

            } // cardBenefit
                registerCardList.add(new OwnUserCardResponse(userCardEntityList.get(i), imagePath, cardName, imageAttr, cardDetailBenefitList));
                System.out.println("registerCardList Size : "+ registerCardList.size());
                cardDetailBenefitList = new ArrayList<>();

        }// cardEntity



//        List<UserCardEntity> userCardList = null;
//        if (status == 0) {
//            userCardList = userCardRepository.findAllByUserId(Integer.parseInt(userId));
//        }else if(status == 1){
//            userCardList = userCardRepository.findAllByUserIdAndIsPaymentEnabledTrue(Integer.parseInt(userId));
//        }else{
//            userCardList = new ArrayList<>();
//        }
//
//        for (UserCardEntity card : userCardList) {
//            card.setToken(null);
//        }

//        return new UserCardListResponse(userCardList);
        return registerCardList;
    }

    @Override
    public List<CardHistoryListResponse> listCardHistory(String userId, String yyyymm) {
        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        int intUserId = Integer.parseInt(userId);

        UserEntity userEntity = userRepository.findByUserId(intUserId)
                .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        UserCardEntity userCard = userCardRepository.findByUserCardId(intUserId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        MyDataApiResponse<?> response = myDataFeign.searchCardPayList(accessToken,
            new MyDataCardHistoryRequest(userCard.getCardIdentifier(), yyyymm));

        if (response.getStatus() != 200) {
            throw new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR);
        }

        MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();

        List<CardHistoryListResponse> cardHistoryListResponse = new ArrayList<>();
        for(int i=0; i<myDataCardPayList.getMyDataCardHistoryList().size(); i++){
            CardHistoryListResponse cardHistoryResponse = new CardHistoryListResponse(myDataCardPayList);
            cardHistoryListResponse.add(cardHistoryResponse);
        }

        // 조회한 데이터를 쓱싹 쓱싹 해서 반환하기

        return cardHistoryListResponse;
    }

    @Override
    public void registUserCard(String userId, RegistUserCardRequest registUserCardRequest) {
        for (RegistUserCard userCard : registUserCardRequest.getRegisterUserCard()) {
            UserCardEntity card = userCardRepository.findByCardIdentifier(userCard.getCardIdentifier())
                .orElse(null);

            if(card == null){
                UserCardEntity newCard = UserCardEntity.registUserCard(userId, userCard);
                userCardRepository.save(newCard);
            }
        }
    }

    @Override
    public void deleteUserCard(String userId, int userCardId) {
        // 유저 정보 2중 확인

        UserCardEntity userCard = userCardRepository.findByUserCardId(userCardId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        // 카드 삭제 여부 / 등록 및 재 등록 .......
        userCardRepository.delete(userCard);
    }

    @Transactional
    @Override
    public void registPayCard(String userId, RegistPayCardRequest registPayCardRequest) {
        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        MyDataApiResponse<?> response = paymentFeign.requestPayToken(accessToken,
            new PayTokenRequest(registPayCardRequest));

        if (response.getStatus() != 200) {
            throw new CustomException(ResponseCode.PAY_TOKEN_ERROR);
        }

        PayTokenResponse payTokenResponse = (PayTokenResponse) response.getData();

        UserCardEntity userCard = userCardRepository.findByCardIdentifier(payTokenResponse.getCardIdentifier())
            .orElse(null);

        if(userCard != null){
            userCard.registPayCard(registPayCardRequest, payTokenResponse);
        }else{
            UserCardEntity card = new UserCardEntity(Integer.parseInt(userId), registPayCardRequest, payTokenResponse);
            userCardRepository.save(card);
        }
    }
}
