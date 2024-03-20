package com.ssafy.eureka.domain.card.dto;
import com.google.gson.annotations.SerializedName;
import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class CardProductDto {

    @SerializedName("카드이름")
    private String cardName;

    @SerializedName("카드사")
    private String cardCompany;

    @SerializedName("연회비")
    private int annualFee;

    @SerializedName("전월실적")
    private int previousPerformance;

    @SerializedName("주요혜택")
    private List<Benefit> benefits;

    @SerializedName("img_path")
    private String imagePath;

    @SerializedName("register_path")
    private String registerPath;

    @SerializedName("state")
    private String state;

    @SerializedName("img_attr")
    private String imageAttribute;

    @Getter
    @Setter
    public static class Benefit {
        @SerializedName("title")
        private String title;

        @SerializedName("desc")
        private String description;

        @SerializedName("detail_desc")
        private String detailedDescription;

        @SerializedName("detail")
        private List<BenefitDetail> details;

        @Getter
        @Setter
        public static class BenefitDetail {
            @SerializedName("카테고리 대분류")
            private String mainCategory;

            @SerializedName("카테고리 소분류")
            private String subCategory;

            @SerializedName("할인타입")
            private String discountType;

            @SerializedName("할인 비용")
            private int discountAmount;

            @SerializedName("할인 비용타입")
            private String discountAmountType;

            @SerializedName("최대 할인 금액")
            private int maxDiscount;

            @SerializedName("일별 할인 횟수 제한")
            private int dailyDiscountLimit;

            @SerializedName("월별 할인 횟수 제한")
            private int monthlyDiscountLimit;

            @SerializedName("할인 한도")
            private int discountLimit;

            @SerializedName("최소 결제 금액")
            private int minimumPaymentAmount;
        }
    }
}