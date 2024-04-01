package com.ssafy.eureka.util;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import org.springframework.stereotype.Component;

import java.util.Calendar;

@Component
public class UserUtil {

    public static String formatBirthDate(String birthInfo, char genderCode) {
        String birthYear = birthInfo.substring(0, 2);
        String monthDay = birthInfo.substring(2);

        int yearPrefix;
        if (genderCode == '1' || genderCode == '2' || genderCode == '5' || genderCode == '6') {
            yearPrefix = 19;
        } else if (genderCode == '3' || genderCode == '4' || genderCode == '7' || genderCode == '8') {
            yearPrefix = 20;
        } else {
            throw new CustomException(ResponseCode.USER_BIRTH_ERROR);
        }

        // 완전한 연도 생성
        String fullYear = yearPrefix + birthYear;

        // yyyyMMdd 형식의 문자열로 반환
        return fullYear + monthDay;
    }

    public static char calculateAgeGroup(String birthInfo, char genderCode) {
        String birth = UserUtil.formatBirthDate(birthInfo, genderCode);
        int birthYear = Integer.parseInt(birth.substring(0, 4));
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        int age = currentYear - birthYear + 1;
        int ageGroupEtc = age / 10;

        int ageGroup;
        if (ageGroupEtc < 1) {
            ageGroup = 1;
        } else ageGroup = Math.min(ageGroupEtc, 6);

        return String.valueOf(ageGroup).charAt(0);
    }
}
