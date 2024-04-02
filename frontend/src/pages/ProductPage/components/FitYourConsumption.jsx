import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
// 데이터 더미
const categoriesData = [
  {
    categoryName: "대중교통",
    totalAmount: 100000,
    cards: [
      {
        cardName: "카드X",
        discountContent: "대중교통 10% 할인",
        discountAmount: 10000,
        cardImage: "../../../../assets/card2.png",
      },
      {
        cardName: "카드Y",
        discountContent: "첫 결제 시 20% 할인",
        discountAmount: 20000,
        cardImage: "../../../../assets/card2.png",
      },
      {
        cardName: "카드Z",
        discountContent: "버스 전용 5% 할인",
        discountAmount: 5000,
        cardImage: "../../../../assets/card2.png",
      },
    ],
  },
  {
    categoryName: "쇼핑",
    totalAmount: 200000,
    cards: [
      {
        cardName: "카드A",
        discountContent: "온라인 쇼핑몰 5% 할인",
        discountAmount: 10000,
        cardImage: "../../../../assets/card2.png",
      },
      {
        cardName: "카드B",
        discountContent: "특정 브랜드 10% 할인",
        discountAmount: 20000,
        cardImage: "../../../../assets/card2.png",
      },
      {
        cardName: "카드C",
        discountContent: "첫 구매 15% 할인",
        discountAmount: 30000,
        cardImage: "../../../../assets/card2.png",
      },
    ],
  },
  {
    categoryName: "음식점",
    totalAmount: 150000,
    cards: [
      {
        cardName: "카드1",
        discountContent: "레스토랑 10% 할인",
        discountAmount: 15000,
        cardImage: "../../../../assets/card2.png",
      },
      {
        cardName: "카드2",
        discountContent: "패스트푸드 5% 캐시백",
        discountAmount: 7500,
        cardImage: "../../../../assets/card2.png",
      },
      {
        cardName: "카드3",
        discountContent: "카페 음료 20% 할인",
        discountAmount: 30000,
        cardImage: "../../../../assets/card2.png",
      },
    ],
  },
];

function FitYourConsumption() {
  const navigation = useNavigation();
  const selectCardInfo = useSelector(
    (state) => state.productList.selectPayCardInfo
  );
  const [selectCardInfoImage, setSelectCardInfoImage] = useState("");
  const [selectCardInfoImgAttr, setSelectCardInfoImgAttr] = useState("");
  useEffect(() => {
    if (selectCardInfo) {
      setSelectCardInfoImage(selectCardInfo.imagePath);
      setSelectCardInfoImgAttr(selectCardInfo.imgAttr);
    }
  }, [selectCardInfo]);

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
          <Text style={styles.notice}>내 카드 대신</Text>
          <Text style={styles.notice}>추천카드를 썼다면?</Text>
          <Text style={styles.subText}>결제카드의 상위 3개의</Text>
          <Text style={styles.subText}>카테고리를 분석했어요</Text>
        </View>

        <Image
          source={
            selectCardInfoImage
              ? { uri: selectCardInfoImage }
              : require("../../../../assets/card2.png")
          } // 조건부 연산자 사용
          style={getImageStyle(selectCardInfoImgAttr)}
          resizeMode="contain"
        />
      </View>

      {/* 나중에 분리예정 */}
      {categoriesData.map((category, index) => (
        <View key={index} style={styles.mainContent}>
          <View style={styles.titleConatiner}>
            <View style={styles.titleTextContainer}>
              <Text style={{ fontSize: 16, fontWeight: "700" }}>
                {category.categoryName}할인 BEST
              </Text>
              <Text
                style={{
                  fontSize: 13,
                  fontWeight: "500",
                  color: "#8a8a8a",
                  marginTop: 5,
                }}
              >
                총 {category.totalAmount} 썼어요
              </Text>
            </View>
            <Image
              source={require("../../../../assets/favicon.png")}
              style={styles.categoriesImage}
            ></Image>
          </View>

          {category.cards.map((card, cardIdx) => (
            <View key={cardIdx} style={styles.cardContainer}>
              <Image
                source={require("../../../../assets/card2.png")}
                style={styles.image2}
              />

              <View style={styles.cardInfo}>
                <Text style={{ fontSize: 12, color: "#707070" }}>
                  {card.cardName}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "600" }}>
                  {card.discountContent}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "800" }}>
                  {card.discountAmount}
                  <Text style={{ fontSize: 12, fontWeight: "600" }}>
                    원 더 할인받아요!
                  </Text>
                </Text>
              </View>
            </View>
          ))}
          <View style={styles.separator}></View>
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  separator: {
    height: 0.7,
    width: "95%",
    backgroundColor: "#d8d8d8",
    marginLeft: 10,
    marginTop: 25,
    marginBottom: 35,
  },
  container: {
    paddingTop: StatusBar.currentHeight + 50,
  },
  nextBtn: {
    color: "#b0b0b0",
    marginLeft: 15,
  },
  topcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  maintextContainer: {
    flexDirection: "column",
    marginRight: 40,
    marginTop: 15,
  },
  subText: {
    fontSize: 12,
    fontWeight: "400",
    color: "#aaaaaa",
  },
  notice: {
    fontSize: 20,
    fontWeight: "600",
  },
  image: {
    height: 80,
    width: 50,
    marginRight: 15,
    marginLeft: 80,
    marginTop: 20,
  },
  image2: {
    height: 70,
    width: 40,
    marginRight: 50,
    marginLeft: -120,
  },
  mainContent: {},
  titleConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
    marginBottom: 25,
    marginLeft: 32,
  },
  titleTextContainer: {},
  categoriesImage: {
    marginRight: 50,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 15,
  },
  horizontalImage: {
    width: 140,
    height: 80,
    marginLeft: 20,
  },
  verticalImage: {
    width: 80,
    height: 140,
    marginLeft: 55,
    marginRight: 15,
  },
  defaultImage: {
    width: 50,
    height: 80,
  },
});

export default FitYourConsumption;
