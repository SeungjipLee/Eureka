package com.ssafy.card.User.service;

import com.ssafy.card.Card.entity.CardHistoryEntity;
import com.ssafy.card.Card.repository.CardHistoryRepository;
import com.ssafy.card.User.dto.response.CardPayHistoryResponse;
import com.ssafy.card.User.dto.response.UserCardListResponse;
import com.ssafy.card.User.dto.response.UserCardResponse;
import com.ssafy.card.User.entity.UserCardEntity;
import com.ssafy.card.User.entity.UserEntity;
import com.ssafy.card.User.repository.UserCardRepository;
import com.ssafy.card.User.repository.UserRepository;
import com.ssafy.card.common.CustomException;
import com.ssafy.card.common.ResponseCode;
import java.util.ArrayList;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserCardServiceImpl implements UserCardService {

    private final UserRepository userRepository;
    private final UserCardRepository userCardRepository;
    private final CardHistoryRepository cardHistoryRepository;

    @Override
    public UserCardListResponse listUserCard(String phoneNumber, int cardCompanyId) {

        UserEntity user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND_CARD));

        List<UserCardEntity> userCardList = userCardRepository.findAllByUserIdAndCardCompanyId(user.getUserId(), cardCompanyId);

        List<UserCardResponse> list = new ArrayList<>();
        for (UserCardEntity userCard : userCardList) {
            list.add(new UserCardResponse(userCard.getCardId(), userCard.getCardIdentifier(),
                userCard.getCardNumber().substring(0, 4),
                userCard.getCardNumber().substring(12, 16)));
        }

        return new UserCardListResponse(list);
    }

    @Override
    public CardPayHistoryResponse listCardHistory(String phoneNumber, String cardIdentifier,
        String yyyymm) {

        UserEntity user = userRepository.findByPhoneNumber(phoneNumber)
                .orElseThrow(() -> new CustomException(ResponseCode.NOT_FOUND_CARD));

        UserCardEntity userCard = userCardRepository.findByCardIdentifier(cardIdentifier)
                .orElseThrow(() -> new CustomException(ResponseCode.USER_CARD_NOT_FOUND));

        List<CardHistoryEntity> list = cardHistoryRepository.findByUserCardIdAndMonthAndYear(
            userCard.getCardId(), yyyymm.substring(0, 4), yyyymm.substring(4, 6));

        return new CardPayHistoryResponse(list);
    }
}
