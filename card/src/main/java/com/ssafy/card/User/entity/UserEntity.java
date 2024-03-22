package com.ssafy.card.User.entity;

import com.ssafy.card.Auth.dto.request.MyDataRequestDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "user")
public class UserEntity  {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    int userId;

    @Column(columnDefinition = "TEXT", nullable = false)
    String phoneNumber;

    @Column(length = 6, nullable = false)
    String birth;

    @Column(length = 15, nullable = false)
    String name;

    public UserEntity(UserEntity entity){
//        this.phoneNumber = entity.phoneNumber;
//        this.birth = entity.getBirth();
//        this.name = entity.getName();
    }

    public UserEntity(MyDataRequestDto dto, List<String> roles){
//        this.phoneNumber = dto.getPhoneNumber();
//        this.birth = dto.getBirth();
//        this.name = dto.getName();
    }

}
