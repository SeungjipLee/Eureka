import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
const { width } = Dimensions.get("window");

function CurrentBenefitMore() {
  const navigation = useNavigation();
  const [cardBenefitList, setCardBenefitList] = useState([]);
  const [totalDiscountAmount, setTotalDiscountAmount] = useState("");
  const selectCardBenefitInfo = useSelector(
    (state) => state.productList.payCardBenefit
  );
  const selectPaycard = useSelector(
    (state) => state.productList.selectPayCardInfo
  );

  useEffect(() => {
    if (selectCardBenefitInfo) {
      setCardBenefitList(selectCardBenefitInfo.discountList),
        setTotalDiscountAmount(selectCardBenefitInfo.totalDiscount);
    }
  }, [selectCardBenefitInfo]);

  // 이미지 스타일을 동적으로 결정하는 함수
  function getImageStyle(imgAttr) {
    if (imgAttr === 0) {
      // 가로 이미지
      return styles.horizontalImage;
    } else if (imgAttr === 1) {
      // 세로 이미지
      return styles.verticalImage;
    } else {
      return styles.defaultImage; // 기본 스타일
    }
  }
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Pressable
        onPress={() => navigation.navigate("ProductPage1")}
        style={{ alignSelf: "flex-start" }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={40}
          style={styles.nextBtn}
        />
      </Pressable>
      <View style={styles.topcontainer}>
        <View style={styles.maintextContainer}>
          <Text style={styles.maintext}>삼성카드 | 신용</Text>
          <Text style={styles.cardName}>{selectPaycard.cardName}</Text>
        </View>

        <Image
          source={{ uri: selectPaycard.imagePath }}
          style={getImageStyle(selectPaycard.imgAttr)} // 동적 스타일 적용
          resizeMode="contain"
        />
      </View>

      <View style={styles.midContainer}>
        <View style={styles.midUpTitle}>
          <Text style={{ fontSize: 15, fontWeight: "400" }}>
            혜택 별 할인금액
          </Text>
        </View>
        <View style={styles.separator}></View>

        <View style={styles.benefitList}>
          {cardBenefitList.map((benefit) => (
            <View key={benefit.categoryId} style={styles.benefitItem}>
              <Text style={styles.benefitContent}>
                * {benefit.categoryName}
              </Text>
              <Text style={styles.discount}>
                + {benefit.discount.toLocaleString()}원
              </Text>
            </View>
          ))}
        </View>
        <View style={styles.bottom}>
          <View style={styles.separator} />
          <View style={styles.resultContainer}>
            <Text>* 합계</Text>
            <Text>{totalDiscountAmount.toLocaleString()}원</Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text>
            총{" "}
            <Text style={{ fontSize: 20 }}>
              {totalDiscountAmount.toLocaleString()}
            </Text>
            원 할인받았어요
          </Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <Pressable style={styles.applyBtn}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
            혜택 더보기
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default CurrentBenefitMore;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 50,
  },
  topcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  midContainer: {
    maxWidth: width - 20,
    maxHeight: 700,
    backgroundColor: "#e5e5e5",
    marginTop: 50,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  image: {
    height: 80,
    width: 50,
    marginRight: 10,
    marginLeft: 100,
  },
  maintextContainer: {
    flexDirection: "column",
    marginRight: 40,
    marginTop: 15,
  },
  maintext: {
    fontSize: 17,
    fontWeight: "400",
  },
  cardName: {
    fontSize: 20,
    fontWeight: "600",
  },
  nextBtn: {
    color: "#b0b0b0",
    marginLeft: 15,
  },
  separator: {
    height: 1,
    width: "95%",
    backgroundColor: "grey",
    marginLeft: 10,
    marginTop: 10,
  },
  benefitList: {
    marginTop: 10,
  },
  benefitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    marginTop: 15,
  },
  totalContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  midUpTitle: {
    marginTop: 20,
    marginLeft: 10,
  },

  applyBtn: {
    borderRadius: 10,
    width: 150,
    height: 50,
    backgroundColor: "#6b84ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  horizontalImage: {
    width: 140,
    height: 80,
    marginLeft: 20,
  },
  verticalImage: {
    width: 80,
    height: 140,
    marginLeft: 25,
  },
  defaultImage: {
    // 기본 이미지 스타일
    width: 50,
    height: 80,
  },
});
