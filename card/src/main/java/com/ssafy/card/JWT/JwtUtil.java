package com.ssafy.card.JWT;

import com.ssafy.card.Auth.dto.response.JwtTokenResponseDto;
import com.ssafy.card.common.CustomException;
import com.ssafy.card.common.ResponseCode;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

import javax.crypto.SecretKey;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    // JWT 생성 및 검증
    private SecretKey secretKey;

    public JwtUtil(@Value("${jwt.secret}") String secret){

        // secret 객체키 생성
        this.secretKey = new SecretKeySpec(secret.getBytes(StandardCharsets.UTF_8), Jwts.SIG.HS256.key().build().getAlgorithm());

    }

    public String getUsername(String token){

        // 암호화된 토큰 검증
        // 우리 서버에서 생성된 키가 우리가 가진 키랑 맞는지 확인
        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("username", String.class);
    }

    public String getRole(String token){

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("role", String.class);
    }

    public String getCategory(String token){

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().get("category", String.class);
    }

    // 토큰 만료 시간
    public Boolean isExpired(String token){

        return Jwts.parser().verifyWith(secretKey).build().parseSignedClaims(token).getPayload().getExpiration().before(new Date());
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null) return bearerToken;
        return null;
    }

    public String createJwt(String category, String username, String role, Long expiredMs){

        return Jwts.builder()
                .claim("username", username)
                .claim("role", role)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expiredMs))
                .signWith(secretKey)
                .compact();
    }

    public JwtTokenResponseDto reIssueToken(HttpServletRequest request){
        String token = getTokenFromRequest(request);

        System.out.println("token : "+ token);
        if (token == null){
            throw new CustomException(ResponseCode.INVALID_REFRESH_TOKEN);
        }

        String username = getUsername(token);
        System.out.println("username : "+ username);

        if(username == null){
            throw new CustomException(ResponseCode.INVALID_USER_NAME);
        }

        String access = createJwt("access", username, null, 31536000000L);
        String refresh = createJwt("refresh", username, null, 31536000000L);

        return new JwtTokenResponseDto("Bearer ", access, refresh);
    }
}
