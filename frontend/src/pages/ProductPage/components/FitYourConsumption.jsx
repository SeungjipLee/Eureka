import React from "react";
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
          source={require("../../../../assets/card2.png")}
          style={styles.image}
        />
      </View>

      {/* 나중에 분리예정 */}
      {categoriesData.map((category, index) => (
        <View key={index} style={styles.mainContent}>
          <View style={styles.titleConatiner}>
            <View style={styles.titleTextContainer}>
              <Text style={styles.titleBest}>
                {category.categoryName}할인 BEST
              </Text>
              <Text style={styles.titleSub}>
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
                <Text>{card.cardName}</Text>
                <Text>{card.discountContent}</Text>
                <Text>{card.discountAmount} 더 할인받아요!</Text>
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
    backgroundColor: "grey",
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
  },
  mainContent: {
    backgroundColor: "#85cf54",
  },
  titleConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    marginBottom: 20,
  },
  titleTextContainer: {},
  categoriesImage: {},
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  cardInfo: {},
});

export default FitYourConsumption;
