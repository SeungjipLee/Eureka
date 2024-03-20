package com.ssafy.card.Auth.dto.request;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.validator.constraints.Length;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MyDataRequestDto {

    @NotBlank
    @Length(max=11)
    String phoneNumber;

    @NotBlank
    @Length(max=6)
    String birth;

    @NotBlank
    @Length(max=15)
    String name;


}
