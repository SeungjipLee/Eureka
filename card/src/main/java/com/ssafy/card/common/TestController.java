package com.ssafy.card.common;

import com.ssafy.card.JWT.JwtUtil;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Collection;
import java.util.Iterator;

@Slf4j
@RestController
@RequestMapping("/admin")
public class TestController {

    private final JwtUtil jwtUtil;

    public TestController(JwtUtil jwtUtil){

        this.jwtUtil = jwtUtil;
    }
    @GetMapping("")
    public String test(){
        log.debug("테스트");

        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        Collection<? extends GrantedAuthority> authorities = authentication.getAuthorities();
        Iterator<? extends GrantedAuthority> iter = authorities.iterator();
        GrantedAuthority auth = iter.next();
        String role = auth.getAuthority();

        return "안냥 "+username+" "+ role;
    }

    @PostMapping("/test2")
    public String test2(){


        return "안녕 나는 테스트야2";
    }
}
