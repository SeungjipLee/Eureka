package com.ssafy.eureka.domain.category.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
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
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int smallCategoryId;

    @NotNull
    @Column(length = 300)
    private String categoryName;

    @NotNull
    private int largeCategoryId;


    public static SmallCategoryEntity regist(Integer largeCategoryId, String subCategory) {
        SmallCategoryEntity smallCategory = new SmallCategoryEntity();
        smallCategory.largeCategoryId = largeCategoryId;
        smallCategory.categoryName = subCategory;
        return smallCategory;
    }
}
