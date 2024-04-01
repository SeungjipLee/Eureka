package com.ssafy.eureka.domain.card.service;

import com.ssafy.eureka.domain.card.dto.CardEntity;
import com.ssafy.eureka.domain.card.dto.request.RegistPayCardRequest;
import com.ssafy.eureka.domain.card.dto.request.RegistUserCardRequest;
import com.ssafy.eureka.domain.card.dto.request.SearchUserCardRequest;
import com.ssafy.eureka.domain.card.dto.response.*;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataCardHistoryResponse;

import java.util.List;

public interface UserCardService {

    MyDataCardListResponse searchUserCard(String userId, SearchUserCardRequest searchUserCardRequest);

    List<OwnUserCardResponse> ownUserCardList(String userId);
    List<PayUserCardResponse> payUserCardList(String userId, String yyyymm);
    CardInfoResponse userCardInfo(int userCardId);

    MyDataCardHistoryResponse listCardHistory(String userId, int userCardId, String yyyymm);

    void registUserCard(String userId, RegistUserCardRequest registUserCardRequest);

    void registPayCard(String userId, RegistPayCardRequest registPayCardRequest);

    void deleteUserCard(String userId, int userCardId);

    CardEntity cardProdRecommend(String userId, int userCardId);

    CardCompareResponse cardProdCompare(String userId, int userCardId);
}
