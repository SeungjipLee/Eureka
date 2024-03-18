package com.ssafy.eureka.domain.auth.jwt;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import com.ssafy.eureka.domain.user.dto.RefreshToken;
import com.ssafy.eureka.domain.user.dto.response.JwtTokenResponse;
import com.ssafy.eureka.domain.user.repository.RefreshTokenRepository;
import java.util.Date;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import jakarta.servlet.http.HttpServletRequest;
import java.security.Key;
import javax.crypto.SecretKey;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;

@Slf4j
@Component
public class JwtTokenProvider {

    @Value("${jwt.secretKey}")
    private String jwtSecret;

    @Value("${jwt.accessTokenExpiration}")
    private Long accessTokenExpiration;

    @Value("${jwt.refreshTokenExpiration}")
    private Long refreshTokenExpiration;

    private final RefreshTokenRepository refreshTokenRepository;

    public JwtTokenProvider(RefreshTokenRepository refreshTokenRepository) {
        this.refreshTokenRepository = refreshTokenRepository;
    }

    public boolean validateToken(String token, UserDetails userDetails) {
        String userId = extractUserId(token);
        return (userId.equals(userDetails.getUsername()) && !expiredToken(token));
    }

    private boolean expiredToken (String token) {
        return extractExpiration(token).before(new Date());
    }

    private Date extractExpiration (String token){
        return extractAllClaims(token).getExpiration();
    }

    private String generateToken(String userId, Long expireDate){
        return Jwts.builder()
            .subject(userId)
            .issuedAt(new Date())
            .expiration(new Date(new Date().getTime() + expireDate))
            .signWith(getKey())
            .compact();
    }

    public JwtTokenResponse createToken(String userId){
        String accessToken = generateToken(userId, accessTokenExpiration);
        String refreshToken = generateToken(userId, refreshTokenExpiration);

        return new JwtTokenResponse(accessToken, refreshToken);
    }

    private Claims extractAllClaims(String token){
        return Jwts.parser()
            .verifyWith((SecretKey) getKey())
            .build()
            .parseSignedClaims(token)
            .getPayload();
    }

    private Key getKey() {
        return Keys.hmacShaKeyFor(Decoders.BASE64.decode(jwtSecret));
    }

    public String extractUserId(String token) {
        return extractAllClaims(token).getSubject();
    }

    public String getTokenFromRequest(HttpServletRequest request) {
        String bearerToken = request.getHeader("Authorization");

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }

    public JwtTokenResponse reissueToken(HttpServletRequest request) {
        String token = getTokenFromRequest(request);

        if(token == null){
            throw new CustomException(ResponseCode.REFRESHTOKEN_ERROR);
        }

        String userId = extractUserId(token);

        if(userId == null){
            throw new CustomException(ResponseCode.USER_NOT_FOUND);
        }

        RefreshToken refreshToken = refreshTokenRepository.findById(userId)
            .orElseThrow(() -> new CustomException(ResponseCode.REFRESHTOKEN_ERROR));

        String userId2 = extractUserId(refreshToken.getRefreshToken());

        if(!userId.equals(userId2)){
            throw new CustomException(ResponseCode.REFRESHTOKEN_ERROR);
        }

        return createToken(userId);
    }
}
