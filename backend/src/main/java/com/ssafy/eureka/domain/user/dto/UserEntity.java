package com.ssafy.eureka.domain.user.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import java.time.LocalDate;
import java.time.LocalDateTime;
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
    private LocalDateTime registeredAt = LocalDateTime.now();

    private String password;

    @NotNull
    @ColumnDefault("0")
    private Boolean isUnregistered;

    private LocalDateTime unRegisteredAt;

    public UserEntity createNewUser(String userName, LocalDate userBirth, String phoneNumber, String password) {
        UserEntity user = new UserEntity();
        user.userName = userName;
        user.userBirth = userBirth;
        user.phoneNumber = phoneNumber;
        user.password = password;
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
