package com.ssafy.eureka.domain.tag.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "user_tag")
@Entity
public class UserTagEntity {
    @Id
    private int userTagId;

    @NotNull
    private int userId;

    @NotNull
    private int tagId;
}
