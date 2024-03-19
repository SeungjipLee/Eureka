package com.ssafy.eureka.domain.user.dto;

import com.ssafy.eureka.domain.user.dto.request.SignUpRequest;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "user")
@Entity
public class UserEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int userId;

    @NotNull
    private String userName;

    @NotNull
    private LocalDate userBirth;

    @NotNull
    private String phoneNumber;

    @NotNull
    @Builder.Default
    private LocalDateTime registeredAt = LocalDateTime.now();

    private String password;

    @NotNull
    @Builder.Default
    private Boolean isUnregistered = false;

    private LocalDateTime unRegisteredAt;

    public static UserEntity signUpUser(String userName, String birth, String password, String phoneNumber) {
        UserEntity user = new UserEntity();
        user.userName = userName;
        user.userBirth = LocalDate.parse(birth,
            DateTimeFormatter.ofPattern("yyyyMMdd"));
        user.password = password;
        user.phoneNumber = phoneNumber;
        return user;
    }

    public void updatePassword(String password){
        this.password = password;
    }

    public void unRegistUser(){
        this.isUnregistered = true;
        this.unRegisteredAt = LocalDateTime.now();
    }
}
