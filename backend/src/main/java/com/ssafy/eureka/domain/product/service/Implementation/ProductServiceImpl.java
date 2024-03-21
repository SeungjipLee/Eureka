package com.ssafy.eureka.domain.product.service.Implementation;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.product.service.ProductService;
import com.ssafy.eureka.domain.user.dto.RefreshToken;
import com.ssafy.eureka.domain.user.dto.UserEntity;
import com.ssafy.eureka.domain.user.dto.request.LoginRequest;
import com.ssafy.eureka.domain.user.dto.response.JwtTokenResponse;
import org.springframework.stereotype.Service;

@Service
public class ProductServiceImpl implements ProductService {
    @Override
    public void cardProdCompanyList() {

    }

//    public JwtTokenResponse login(LoginRequest loginRequest) {
//        UserEntity user = userRepository.findByUserId(loginRequest.getUserId())
//                .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));
//
//        if(user.getIsUnregistered()){
//            throw new CustomException(ResponseCode.USER_NOT_FOUND);
//        }
//
//        String encodePassword = bCryptPasswordEncoder.encode(loginRequest.getPassword());
//
//        if(!user.getPassword().equals(encodePassword)){
//            throw new CustomException(ResponseCode.USER_PASSWORD_ERROR);
//        }
//
//        JwtTokenResponse jwtTokenResponse = jwtTokenProvider.createToken(String.valueOf(user.getUserId()));
//
//        if(refreshTokenRepository.existsByUserId(String.valueOf(user.getUserId()))){
//            refreshTokenRepository.deleteByUserId(String.valueOf(user.getUserId()));
//        }
//
//        refreshTokenRepository.save(new RefreshToken(String.valueOf(user.getUserId()), jwtTokenResponse.getRefreshToken()));
//
//        return jwtTokenResponse;
//    }
}
