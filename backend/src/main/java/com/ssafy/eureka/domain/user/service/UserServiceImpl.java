package com.ssafy.eureka.domain.user.service;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.MyDataApiResponse;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.auth.jwt.JwtTokenProvider;
import com.ssafy.eureka.domain.card.repository.MydataTokenRepository;
import com.ssafy.eureka.domain.mydata.dto.MyDataToken;
import com.ssafy.eureka.domain.mydata.dto.request.MyDataTokenRequest;
import com.ssafy.eureka.domain.mydata.dto.response.MyDataTokenResponse;
import com.ssafy.eureka.domain.mydata.feign.MyDataFeign;
import com.ssafy.eureka.domain.user.dto.RefreshToken;
import com.ssafy.eureka.domain.user.dto.UserEntity;
import com.ssafy.eureka.domain.user.dto.request.CheckUserRequest;
import com.ssafy.eureka.domain.user.dto.request.LoginRequest;
import com.ssafy.eureka.domain.user.dto.request.SendMessageRequest;
import com.ssafy.eureka.domain.user.dto.request.SignUpRequest;
import com.ssafy.eureka.domain.user.dto.response.CheckUserRespnose;
import com.ssafy.eureka.domain.user.dto.response.JwtTokenResponse;
import com.ssafy.eureka.domain.user.repository.RefreshTokenRepository;
import com.ssafy.eureka.domain.user.repository.UserRepository;
import com.ssafy.eureka.util.AesUtil;
import com.ssafy.eureka.util.UserUtil;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.transaction.Transactional;
import java.time.format.DateTimeFormatter;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService{

    private final UserRepository userRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final AesUtil aesUtil;
    private final UserUtil userUtil;

    private final MyDataFeign myDataFeign;
    private final MydataTokenRepository mydataTokenRepository;

    @Override
    public void sendMessage(SendMessageRequest sendMessageRequest) {
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
    public void resignUser(UserDetails userDetails) {
        UserEntity user = userRepository.findByUserId(Integer.parseInt(userDetails.getUsername()))
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        user.unRegistUser();
    }

    @Override
    public CheckUserRespnose checkUser(CheckUserRequest checkUserRequest) {
        // 인증번호 체크
        if(!checkUserRequest.getAuthNumber().equals("123456")){
            throw new CustomException(ResponseCode.PASSWORD_ERROR);
        }

        String encodePhoneNumber = aesUtil.encrypt(checkUserRequest.getPhoneNumber());

        return userRepository.findByPhoneNumber(encodePhoneNumber)
            .map(user -> new CheckUserRespnose(user.getUserId(), user.getUserName()))
            .orElse(null);
    }

    @Override
    @Transactional
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

        MyDataApiResponse<?> response = myDataFeign.requestToken(new MyDataTokenRequest(signUpRequest.getPhoneNumber(), signUpRequest.getUserBirth(), signUpRequest.getUserName()));

        if(response.getStatus() != 200){
            throw new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR);
        }

        MyDataTokenResponse myDataTokenResponse = (MyDataTokenResponse) response.getData();
        MyDataToken myDataToken = new MyDataToken(userId, myDataTokenResponse.getAccessToken(), myDataTokenResponse.getRefreshToken());

        if(myDataToken.getAccessToken() == null){
            throw new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR);
        }

        mydataTokenRepository.save(myDataToken);

        return jwtTokenResponse;
    }

    @Override
    public JwtTokenResponse login(LoginRequest loginRequest) {
        UserEntity user = userRepository.findByUserId(loginRequest.getUserId())
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        if(user.getIsUnregistered()){
            throw new CustomException(ResponseCode.USER_NOT_FOUND);
        }

        if(!bCryptPasswordEncoder.matches(loginRequest.getPassword(), user.getPassword())){
            throw new CustomException(ResponseCode.USER_PASSWORD_ERROR);
        }

        JwtTokenResponse jwtTokenResponse = jwtTokenProvider.createToken(String.valueOf(user.getUserId()));

        if(refreshTokenRepository.existsByUserId(String.valueOf(user.getUserId()))){
            refreshTokenRepository.deleteByUserId(String.valueOf(user.getUserId()));
        }

        refreshTokenRepository.save(new RefreshToken(String.valueOf(user.getUserId()), jwtTokenResponse.getRefreshToken()));

        String phoneNumber = aesUtil.decrypt(user.getPhoneNumber());
        String userBirth = user.getUserBirth().format(DateTimeFormatter.ofPattern("yyMMdd"));

        MyDataApiResponse<?> response = myDataFeign.requestToken(new MyDataTokenRequest(phoneNumber, userBirth, user.getUserName()));

        if(response.getStatus() != 200){
            throw new CustomException(ResponseCode.MY_DATA_TOKEN_ERROR);
        }

        MyDataTokenResponse myDataTokenResponse = (MyDataTokenResponse) response.getData();
        MyDataToken myDataToken = new MyDataToken(String.valueOf(user.getUserId()), myDataTokenResponse.getAccessToken(), myDataTokenResponse.getRefreshToken());

        mydataTokenRepository.save(myDataToken);

        return jwtTokenResponse;
    }

    @Override
    public void checkPassword(UserDetails userDetails, String password) {
        UserEntity user = userRepository.findByUserId(Integer.parseInt(userDetails.getUsername()))
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        if(!bCryptPasswordEncoder.matches(password, user.getPassword())){
            throw new CustomException(ResponseCode.USER_PASSWORD_ERROR);
        }
    }

    @Override
    public void updatePassword(UserDetails userDetails, String password) {
        UserEntity user = userRepository.findByUserId(Integer.parseInt(userDetails.getUsername()))
            .orElseThrow(() -> new CustomException(ResponseCode.USER_NOT_FOUND));

        String encodePassword = bCryptPasswordEncoder.encode(password);
        user.updatePassword(encodePassword);
    }
}
