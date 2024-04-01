package com.ssafy.eureka.util;

import com.ssafy.eureka.common.exception.CustomException;
import com.ssafy.eureka.common.response.ResponseCode;
import lombok.Getter;

@Getter
public class DateParserUtil {
    private final String year;
    private final String month;

    public DateParserUtil(String yyyyMM) {
        validateYearMonth(yyyyMM);
        this.year = yyyyMM.substring(0, 4);
        this.month = yyyyMM.substring(4, 6);
    }
    private void validateYearMonth(String yyyyMM) {
        if (yyyyMM.length() != 6) {
            throw new CustomException(ResponseCode.INVALID_YEAR_MONTH);
        }
        try {
            int year = Integer.parseInt(yyyyMM.substring(0, 4));
            int month = Integer.parseInt(yyyyMM.substring(4, 6));
            if (month < 1 || month > 12) {
                throw new CustomException(ResponseCode.INVALID_YEAR_MONTH);
            }
        } catch (NumberFormatException e) {
            throw new CustomException(ResponseCode.INVALID_YEAR_MONTH);
        }
    }
}
