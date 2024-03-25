import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const { width } = Dimensions.get("window");
const CurrentBenfitAmount = 6800;

const benefits = [
  { id: 1, content: "할인 혜택", amount: "5,000원" },
  { id: 2, content: "적립 혜택", amount: "10,000원" },
  { id: 3, content: "기타 혜택", amount: "3,000원" },
];

function CompareCard() {
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
          <Text style={styles.maintext}>삼성카드 | 신용</Text>
          <Text style={styles.cardName}>MR.LIFE Card</Text>
        </View>

        <Image
          source={require("../../../../assets/card2.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.midContainer}>
        <View style={styles.top}>
          <Text style={styles.maintext}>현재카드 이번달 혜택</Text>
          <Text style={styles.benefitAmount}>
            {CurrentBenfitAmount.toLocaleString()}원
          </Text>
        </View>

        <View style={styles.separator}></View>
        <View style={styles.midUpTitle}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            내 카드 대신 추천카드를 썼다면?
          </Text>
        </View>

        <View style={styles.midUp}>
          <View style={styles.twoCardCompare}>
            <View style={styles.myCard}>
              <Text style={{ fontSize: 10 }}>내 카드</Text>
              <Image
                source={require("../../../../assets/card2.png")}
                style={styles.image2}
              />
            </View>

            <MaterialCommunityIcons
              name="arrow-right-thin"
              size={24}
              style={styles.arrowIcon}
            />

            <View style={styles.otherCard}>
              <Text style={{ fontSize: 10 }}>추천 카드</Text>
              <Image
                source={require("../../../../assets/card2.png")}
                style={styles.image2}
              />
            </View>
          </View>

          <View style={styles.compareInfo}>
            <View style={styles.cardInfoContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연회비</Text>
                <Text style={styles.infoAmount}>50,000원</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연 할인</Text>
                <Text style={styles.infoAmount}>100,000원</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연 적립</Text>
                <Text style={styles.infoAmount}>200,000원</Text>
              </View>
            </View>

            <View style={styles.cardInfoContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연회비</Text>
                <Text style={styles.infoAmount}>60,000원</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연 할인</Text>
                <Text style={styles.infoAmount}>150,000원</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연 적립</Text>
                <Text style={styles.infoAmount}>250,000원</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.midBottom}>
          <View style={styles.midUpTitle}>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              혜택 별 할인 예상금액
            </Text>
          </View>
          <View style={styles.separator}></View>

          <View style={styles.benefitList}>
            {benefits.map((benefit) => (
              <View key={benefit.id} style={styles.benefitItem}>
                <Text style={styles.benefitContent}>* {benefit.content}</Text>
                <Text style={styles.benefitAmount}>{benefit.amount}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.bottom}>
          <View style={styles.separator} />
          <View style={styles.resultContainer}>
            <Text>합계</Text>
            <Text>결과</Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text>총 100000원 이득</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Pressable style={styles.plusBtn}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
            혜택 더보기
          </Text>
        </Pressable>

        <Pressable style={styles.applyBtn}>
          <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
            온라인 신청하기
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

export default CompareCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 50,
  },
  topcontainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
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
  midContainer: {
    justifyContent: "center",
    flex: 3,
    maxWidth: width - 20,
    minHeight: 1000,
    backgroundColor: "#e5e5e5",
    marginTop: 50,
    marginHorizontal: 15,
    borderRadius: 5,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  plusBtn: {
    borderRadius: 10,
    width: 150,
    height: 60,
    backgroundColor: "#b4b4b4",
    marginRight: 10, // 오른쪽 마진 값을 증가시켜 간격을 더 넓게 조정
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // 그림자 색상
    shadowOffset: {
      width: 0,
      height: 2, // 그림자의 방향과 거리
    },
    shadowOpacity: 0.25, // 그림자의 투명도
    shadowRadius: 3.84, // 그림자의 둥근 정도

    elevation: 5, // 안드로이드에서 그림자 효과를 위해 필요
  },
  applyBtn: {
    borderRadius: 10,
    width: 150,
    height: 60,
    backgroundColor: "#6b84ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000", // 그림자 색상
    shadowOffset: {
      width: 0,
      height: 2, // 그림자의 방향과 거리
    },
    shadowOpacity: 0.25, // 그림자의 투명도
    shadowRadius: 3.84, // 그림자의 둥근 정도

    elevation: 5, // 안드로이드에서 그림자 효과를 위해 필요
  },

  nextBtn: {
    color: "#b0b0b0",
    marginLeft: 15,
  },
  maintext: {
    fontSize: 15,
    fontWeight: "200",
  },
  benefitAmount: {
    fontSize: 15,
  },
  top: {
    flex: 0.2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginLeft: 10,
    marginRight: 15,
  },
  midUp: {
    flex: 1,
    alignItems: "center",
    marginBottom: -180,
  },
  midBottom: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
  separator: {
    height: 1,
    width: "95%",
    backgroundColor: "grey",
    marginLeft: 10,
  },
  midUpTitle: {
    marginTop: 10,
    marginLeft: 10,
    marginBottom: 5,
  },
  twoCardCompare: {
    flexDirection: "row",
    maxWidth: "80%",
    marginTop: 15,
  },
  image2: {
    width: 60,
    height: 90,
    marginTop: 5,
  },
  myCard: {
    marginRight: 60,
    alignItems: "center",
  },
  otherCard: {
    marginLeft: 60,
    marginRight: 10,
    alignItems: "center",
  },
  arrowIcon: {
    alignSelf: "center",
  },
  compareInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  cardInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },

  infoBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 5,
    width: 140,
  },

  infoTitle: {
    fontSize: 11,
    fontWeight: "400",
  },

  infoAmount: {
    fontSize: 14,
    fontWeight: "400",
  },
  benefitList: {
    marginBottom: -100,
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
    marginVertical: 5,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: -100,
  },
  totalContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  bulletPoint: {
    width: 10, // 점의 크기, 필요에 따라 조정
    height: 10, // 점의 크기, 필요에 따라 조정
    borderRadius: 5, // 점을 원형으로 만듭니다 (width/2)
    backgroundColor: "black", // 점의 색상
    marginRight: 10, // 텍스트와의 간격
  },
});
