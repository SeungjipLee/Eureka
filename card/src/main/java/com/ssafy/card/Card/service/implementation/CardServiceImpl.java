package com.ssafy.card.Card.service.implementation;

import com.ssafy.card.Card.dto.response.CardHistoryResponse;
import com.ssafy.card.Card.entity.CardEntity;
import com.ssafy.card.Card.entity.CardHistoryEntity;
import com.ssafy.card.Card.entity.repository.CardHistoryRepository;
import com.ssafy.card.Card.service.CardService;
import com.ssafy.card.User.dto.response.UserCardResponse;
import com.ssafy.card.User.entity.UserCardEntity;
import com.ssafy.card.User.entity.UserEntity;
import com.ssafy.card.User.repository.UserCardRepository;
import com.ssafy.card.User.repository.UserRepository;
import com.ssafy.card.common.CustomException;
import com.ssafy.card.common.ResponseCode;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Slf4j
@RequiredArgsConstructor
public class CardServiceImpl implements CardService {

    private final UserCardRepository userCardRepository;
    private final CardHistoryRepository cardHistoryRepository;
    private final UserRepository userRepository;

    @Override
    public List<UserCardResponse> cardList(UserDetails userDetails) {

        String phoneNumber = userDetails.getUsername();
        System.out.println(phoneNumber);
        UserEntity userEntity = userRepository.findByPhoneNumber(phoneNumber)
                        .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        int userId = userEntity.getUserId();

        List<UserCardEntity> userCardEntityList = userCardRepository.findAllByUserId(userId);
        if(userCardEntityList == null) throw new CustomException(ResponseCode.USER_CARD_NOT_FOUND);

        List<UserCardResponse> list = new ArrayList<>();
        for (int i=0; i<userCardEntityList.size(); i++){

            UserCardEntity userCardEntity = userCardEntityList.get(i);
            int cardId = userCardEntity.getCardId();
            String cardIdentifier = userCardEntity.getCardIdentifier();
            String firstCardNumber = userCardEntity.getCardNumber().substring(0, 4);
            String lastCardNumber = userCardEntity.getCardNumber().substring(12, 16);

            list.add(new UserCardResponse(cardId, cardIdentifier, firstCardNumber, lastCardNumber));
        }

        return list;
    }

    @Override
    public List<CardHistoryEntity> cardHistory(String phoneNumber, String cardIdentifier, String yyyymm) {

        UserEntity userEntity = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        UserCardEntity userCardEntity = userCardRepository.findByCardIdentifier(cardIdentifier)
                .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND_CARD));

        // 해당 유저 카드 ID
        int userCardId = userCardEntity.getUserCardId();
        String token = userCardEntity.getToken();
        if(token == null) throw new CustomException(ResponseCode.INVALID_ACCESS_TOKEN);

        List<CardHistoryEntity> list = cardHistoryRepository.findByUserCardIdAndMonthAndYear(
                userCardId, yyyymm.substring(0, 4), yyyymm.substring(4, 6));
//        List<CardHistoryEntity> list = cardHistoryRepository.findByUserCardId(userCardId);

        List<CardHistoryResponse> historyList = new ArrayList<>();
        for(int i=0; i<list.size(); i++){
            historyList.add(new CardHistoryResponse(list.get(i)));
        }

        return list;
    }
}
