package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.UserCardEntity;
import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest.RegistUserCard;
import com.ssafy.eureka.domain.card.dto.response.CardHistoryListResponse;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse;
import com.ssafy.eureka.domain.card.dto.response.MyDataCardListResponse.MyDataCard;
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
import com.ssafy.eureka.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCardServiceImpl implements UserCardService {

    private final MydataTokenRepository mydataTokenRepository;
    private final UserCardRepository userCardRepository;
    private final UserRepository userRepository;
    private final CardRepository cardRepository;

    private final MyDataFeign myDataFeign;
    private final PaymentFeign paymentFeign;

    @Override
    public MyDataCardListResponse searchUserCard(String userId,
        SearchUserCardRequest searchUserCardRequest) {
        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MYDATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        List<MyDataCard> list = new ArrayList<>();

        for (Integer comp : searchUserCardRequest.getCardCompayList()) {
            MyDataApiResponse<?> response =myDataFeign.searchUserCard(accessToken, comp);

            if(response.getStatus() != 200){
                throw new CustomException(ResponseCode.MYDATA_TOKEN_ERROR);
            }

            MyDataUserCardResponse myDataUserCardResponse = (MyDataUserCardResponse) response.getData();

            for (MyDataUserCard myDataUserCard : myDataUserCardResponse.getUserCardList()) {
                CardEntity card = cardRepository.findByCardId(myDataUserCard.getCardId());
                if (card != null) {
                    list.add(new MyDataCard(card, myDataUserCard));
                }
            }
        }

        return new MyDataCardListResponse(list);
    }

    @Override
    public UserCardListResponse listUserCard(String userId) {
        List<UserCardEntity> userCardList = userCardRepository.findAllByUserId(
            Integer.parseInt(userId));

        for (UserCardEntity card : userCardList) {
            card.setToken(null);
        }

        return new UserCardListResponse(userCardList);
    }

    @Override
    public CardHistoryListResponse listCardHistory(String userId, int userCardId, String yyyymm) {
        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MYDATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        UserCardEntity userCard = userCardRepository.findByUserCardId(userCardId)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        MyDataApiResponse response = myDataFeign.searchCardPayList(accessToken,
            new MyDataCardHistoryRequest(userCard.getCardIdentifier(), yyyymm));

        if(response.getStatus() != 200){
            throw new CustomException(ResponseCode.MYDATA_TOKEN_ERROR);
        }

        MyDataCardHistoryResponse myDataCardPayList = (MyDataCardHistoryResponse) response.getData();

        CardHistoryListResponse cardHistoryListResponse = new CardHistoryListResponse();

        // 조회한 데이터를 쓱싹 쓱싹 해서 반환하기

        return cardHistoryListResponse;
    }

    //
    @Override
    public void registUserCard(String userId, RegistUserCardRequest registUserCardRequest) {
        for (RegistUserCard usercard : registUserCardRequest.getRegisterUserCard()) {
            UserCardEntity card = UserCardEntity.registUserCard(userId, usercard);
            userCardRepository.save(card);
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
        UserCardEntity userCard = userCardRepository.findByUserCardId(
                registPayCardRequest.getUserCardId())
            .orElseThrow(()->new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        MyDataToken myDataToken = mydataTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.MYDATA_TOKEN_ERROR));

        String accessToken = myDataToken.getAccessToken();

        MyDataApiResponse<?> response = paymentFeign.requestPayToken(accessToken, new PayTokenRequest(registPayCardRequest));

        if(response.getStatus() != 200){
            throw new CustomException(ResponseCode.PAY_TOKEN_ERROR);
        }

        PayTokenResponse payTokenResponse = (PayTokenResponse) response.getData();

        userCard.registPayCard(registPayCardRequest, payTokenResponse.getAccessToken());
    }
}
