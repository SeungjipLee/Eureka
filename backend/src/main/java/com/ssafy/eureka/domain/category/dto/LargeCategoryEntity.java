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
@Table(name = "large_category")
public class LargeCategoryEntity {

    @Id
    private int largeCategoryId;

    @NotNull
    private String categoryName;
}
