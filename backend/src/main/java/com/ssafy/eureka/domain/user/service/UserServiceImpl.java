package com.ssafy.eureka.domain.user.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.auth.jwt.JwtTokenProvider;
import com.ssafy.eureka.domain.user.dto.RefreshToken;
import com.ssafy.eureka.domain.user.dto.UserEntity;
import com.ssafy.eureka.domain.user.dto.request.CheckUserRequest;
import com.ssafy.eureka.domain.user.dto.request.LoginRequest;
import com.ssafy.eureka.domain.user.dto.request.SignUpRequest;
import com.ssafy.eureka.domain.user.dto.response.CheckUserRespnose;
import com.ssafy.eureka.domain.user.dto.response.JwtTokenResponse;
import com.ssafy.eureka.domain.user.repository.RefreshTokenRepository;
import com.ssafy.eureka.domain.user.repository.UserRepository;
import com.ssafy.eureka.util.AesUtil;
import com.ssafy.eureka.util.UserUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.AllArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@AllArgsConstructor
public class UserServiceImpl implements UserService{

    private UserRepository userRepository;
    private RefreshTokenRepository refreshTokenRepository;
    private JwtTokenProvider jwtTokenProvider;
    private BCryptPasswordEncoder bCryptPasswordEncoder;
    private AesUtil aesUtil;
    private UserUtil userUtil;

    @Override
    public void sendMessage(CheckUserRequest checkUserRequest) {
        // 문자 전송
    }

    @Override
    public JwtTokenResponse reissueToken(HttpServletRequest request) {
        JwtTokenResponse jwtTokenResponse = jwtTokenProvider.reissueToken(request);

        String userId = jwtTokenProvider.extractUserId(jwtTokenResponse.getRefreshToken());

        if(refreshTokenRepository.existsByUserId(userId)){
            refreshTokenRepository.deleteByUserId(userId);
        }

        refreshTokenRepository.save(new RefreshToken(userId, jwtTokenResponse.getRefreshToken()));

        return jwtTokenResponse;
    }

    @Override
    public CheckUserRespnose checkUser(CheckUserRequest checkUserRequest) {

        // 인증번호 체크
        if(!checkUserRequest.getPassword().equals("123456")){
            throw new CustomException(ResponseCode.PASSWORD_ERROR);
        }

        String encodePhoneNumber = aesUtil.encrypt(checkUserRequest.getPhoneNumber());

        UserEntity user = userRepository.findByPhoneNumber(encodePhoneNumber)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        return new CheckUserRespnose(user.getUserId(), user.getUserName());
    }

    @Override
    public JwtTokenResponse signUp(SignUpRequest signUpRequest) {
        String encodePhoneNumber = aesUtil.encrypt(signUpRequest.getPhoneNumber());

        UserEntity user = UserEntity.signUpUser(
            signUpRequest.getUserName(),
            userUtil.formatBirthDate(signUpRequest.getUserBirth(), signUpRequest.getUserGender()),
            bCryptPasswordEncoder.encode(signUpRequest.getPassword()),
            encodePhoneNumber);


        if(userRepository.findByPhoneNumber(encodePhoneNumber).isPresent()){
            throw new CustomException(ResponseCode.USER_ALREADY_EXSIST);
        }

        userRepository.save(user);

        String userId = String.valueOf(user.getUserId());

        JwtTokenResponse jwtTokenResponse = jwtTokenProvider.createToken(userId);

        refreshTokenRepository.save(new RefreshToken(userId, jwtTokenResponse.getRefreshToken()));

        return jwtTokenResponse;
    }

    @Override
    public JwtTokenResponse login(LoginRequest loginRequest) {
        UserEntity user = userRepository.findByUserId(loginRequest.getUserId())
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        String encodePassword = bCryptPasswordEncoder.encode(loginRequest.getPassword());

        if(!user.getPassword().equals(encodePassword)){
            throw new CustomException(ResponseCode.USER_PASSWORD_ERROR);
        }

        JwtTokenResponse jwtTokenResponse = jwtTokenProvider.createToken(String.valueOf(user.getUserId()));

        if(refreshTokenRepository.existsByUserId(String.valueOf(user.getUserId()))){
            refreshTokenRepository.deleteByUserId(String.valueOf(user.getUserId()));
        }

        refreshTokenRepository.save(new RefreshToken(String.valueOf(user.getUserId()), jwtTokenResponse.getRefreshToken()));

        return jwtTokenResponse;
    }

    @Override
    public JwtTokenResponse checkPassword(CheckUserRequest checkUserRequest) {
        String encodePhoneNumber = aesUtil.encrypt(checkUserRequest.getPhoneNumber());

        UserEntity user = userRepository.findByPhoneNumber(encodePhoneNumber)
            .orElseThrow(() -> new CustomException(ResponseCode.USER_PASSWORD_ERROR));

        String encodePassword = bCryptPasswordEncoder.encode(checkUserRequest.getPassword());

        if(user.getPassword().equals(encodePassword)){
            throw new CustomException(ResponseCode.USER_PASSWORD_ERROR);
        }

        String userId = String.valueOf(user.getUserId());

        JwtTokenResponse jwtTokenResponse = jwtTokenProvider.createToken(userId);

        if(refreshTokenRepository.existsByUserId(userId)){
            refreshTokenRepository.deleteByUserId(userId);
        }

        refreshTokenRepository.save(new RefreshToken(userId, jwtTokenResponse.getRefreshToken()));

        return jwtTokenResponse;
    }

    @Override
    public void updatePassword(UserDetails userDetails, String password) {
        UserEntity user = userRepository.findByUserId(Integer.parseInt(userDetails.getUsername()))
            .orElseThrow(() -> new CustomException(ResponseCode.USER_PASSWORD_ERROR));

        String encodePassword = bCryptPasswordEncoder.encode(password);

        user.updatePassword(encodePassword);
    }
}
