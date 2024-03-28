package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest;
import com.ssafy.eureka.domain.card.dto.request.SearchUserCardRequest;
import com.ssafy.eureka.domain.card.dto.response.*;

import java.util.List;

public interface UserCardService {

    MyDataCardListResponse searchUserCard(String userId, SearchUserCardRequest searchUserCardRequest);

    List<OwnUserCardResponse> ownUserCardList(String userId);
    List<PayUserCardResponse> payUserCardList(String userId);
    CardInfoResponse userCardInfo(int userCardId);

    List<CardHistoryListResponse> listCardHistory(String userId, String yyyymm);

    void registUserCard(String userId, RegistUserCardRequest registUserCardRequest);

    void registPayCard(String userId, RegistPayCardRequest registPayCardRequest);

    void deleteUserCard(String userId, int userCardId);
}
