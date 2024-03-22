package com.ssafy.card.User.service;

import com.ssafy.card.User.dto.response.CardPayHistoryResponse;
import com.ssafy.card.User.dto.response.UserCardListResponse;

public interface UserCardService {

    UserCardListResponse listUserCard(String phoneNumber, int cardCompanyId);

    CardPayHistoryResponse listCardHistory(String phoneNumber, String cardIdentifier, String yyyymm);
}
