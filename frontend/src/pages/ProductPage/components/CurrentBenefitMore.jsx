import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
import TokenUtils from "../../../stores/TokenUtils";
import { getMySingleCardBenefitList } from "../../../apis/ProductApi";

const { width } = Dimensions.get("window");
const benefits = [
  { id: 1, content: "할인 혜택", amount: "5,000원" },
  { id: 2, content: "적립 혜택", amount: "10,000원" },
  { id: 3, content: "기타 혜택", amount: "3,000원" },
];

function CurrentBenefitMore() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const selectCardInfo = useSelector(
    (state) => state.productList.selectPayCardInfo
  );

  const seclectCarduserCardId = selectCardInfo.userCardId;

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token && seclectCarduserCardId) {
      getMySingleCardBenefitList(
        token,
        202403,
        seclectCarduserCardId,
        (res) => {
          console.log(res.data, "현재결제카드 혜택불러오기 성공");
        },
        (err) => {
          console.log("현재결제카드 혜택불러오기 실패", err);
        }
      );
    }
  }, [token, seclectCarduserCardId]);

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
        <View style={styles.midUpTitle}>
          <Text style={{ fontSize: 15, fontWeight: "400" }}>
            혜택 별 할인금액
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
        <View style={styles.bottom}>
          <View style={styles.separator} />
          <View style={styles.resultContainer}>
            <Text>합계</Text>
            <Text>결과</Text>
          </View>
        </View>
        <View style={styles.totalContainer}>
          <Text>총 100000원 할인받았어요</Text>
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
    height: 60,
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
});
