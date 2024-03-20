package com.ssafy.card.common;

import com.ssafy.card.Auth.dto.request.CustomUserDetails;
import com.ssafy.card.User.entity.UserEntity;
import com.ssafy.card.User.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    private final UserRepository userRepository;

    public CustomUserDetailsService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    // 로그인하는 유저 정보 가져옴
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {

        System.out.println("Username : " + username);
        UserEntity userData = userRepository.findByName(username);
        System.out.println("UserEntity : " + userData.getUserId());

        if (userData != null) {
            return new CustomUserDetails(userData);
        }
        return null;
    }
}
