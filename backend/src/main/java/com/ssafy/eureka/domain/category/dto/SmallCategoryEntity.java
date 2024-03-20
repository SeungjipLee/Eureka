package com.ssafy.eureka.domain.category.dto;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.validation.constraints.NotNull;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name = "small_category")
public class SmallCategoryEntity {

    @Id
    private int smallCategoryId;

    @NotNull
    private String categoryName;

    @NotNull
    private int largeCategoryId;
}
