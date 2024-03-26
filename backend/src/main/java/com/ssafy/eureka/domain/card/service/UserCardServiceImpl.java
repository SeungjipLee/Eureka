package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.CardCompanyEntity;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest.RegistUserCard;
import com.ssafy.eureka.domain.card.dto.response.CardHistoryListResponse;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse.MyDataCard;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse.MyDataCard.Card;
import com.ssafy.eureka.domain.card.repository.CardCompanyRepository;
import com.ssafy.eureka.domain.card.repository.CardRepository;
import com.ssafy.eureka.domain.card.repository.UserCardRepository;
import com.ssafy.eureka.domain.mydata.dto.MyDataToken;
import com.ssafy.eureka.domain.card.dto.request.SearchUserCardRequest;
import com.ssafy.eureka.domain.card.dto.response.UserCardListResponse;
import com.ssafy.eureka.domain.mydata.dto.request.MyDataCardHistoryRequest;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataUserCardResponse;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataUserCardResponse.MyDataUserCard;
import com.ssafy.eureka.domain.mydata.feign.MyDataFeign;
import com.ssafy.eureka.domain.card.repository.MydataTokenRepository;
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
    public UserCardListResponse listUserCard(String userId, int status) {
        List<UserCardEntity> userCardList = null;
        if (status == 0) {
            userCardList = userCardRepository.findAllByUserId(Integer.parseInt(userId));
        }else if(status == 1){
            userCardList = userCardRepository.findAllByUserIdAndIsPaymentEnabledTrue(Integer.parseInt(userId));
        }else{
            userCardList = new ArrayList<>();
        }

        for (UserCardEntity card : userCardList) {
            card.setToken(null);
        }

        return new UserCardListResponse(userCardList);
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
