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
@Table(name = "tag")
@Entity
public class TagEntity {
    @Id
    private int tagId;

    @NotNull
    private int largeCategoryId;

    @NotNull
    private String tagName;

    @NotNull
    private String tagImagePath;
}
