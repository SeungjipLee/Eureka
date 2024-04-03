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
import TokenUtils from "../../../stores/TokenUtils";
import { useSelector } from "react-redux";
import { getUserTop10, getDdoraeTop10 } from "../../../apis/ProductApi";

function PopularCard() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const selectCardInfo = useSelector(
    (state) => state.productList.selectPayCardInfo
  );
  const [userCardId, setUserCardId] = useState("");

  useEffect(() => {
    if (selectCardInfo) {
      setUserCardId(selectCardInfo.userCardId);
      console.log(selectCardInfo.userCardId);
    }
  }, [selectCardInfo]);

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    // 토큰과 selectId가 유효할 때만 API 호출
    if (token && userCardId) {
      getUserTop10(
        token,
        (res) => {
          console.log(res.data, "Popularcard");
        },
        (err) => {
          console.log("PopularCard, err", err);
        }
      );

      getDdoraeTop10(
        token,
        userCardId,
        (res) => {
          console.log(res.data, "DdoraeCard");
        },
        (err) => {
          console.log("PopularCard, err", err);
        }
      );
    }
  }, [token, userCardId]);

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
          <Text style={styles.notice}>또래들은</Text>
          <Text style={styles.notice}>어떤 카드를 좋아할까요?</Text>
          <Text style={styles.subText}>또래 인기카드와</Text>
          <Text style={styles.subText}>유레카 인기카드를 가져왔어요</Text>
        </View>

        <Image
          source={require("../../../../assets/GrinningFace.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>

      {/* {cards.map((category, index) => ( */}
      <View style={styles.mainContent}>
        <View style={styles.titleConatiner}>
          <View style={styles.titleTextContainer}>
            <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 15 }}>
              {/* {category.largeCategoryName}할인 BEST */}
            </Text>
            <Text
              style={{
                fontSize: 13,
                fontWeight: "500",
                color: "#8a8a8a",
                marginTop: 5,
              }}
            >
              {/* 총 {category.totalAmount} 썼어요 */}
            </Text>
          </View>
        </View>

        {/* {category.list.map((card, cardIdx) => (
            <Pressable
              key={cardIdx}
              style={styles.cardContainer}
              onPress={() =>
                navigation.navigate("SelectCardInfo", {
                  cardId: card.cardId,
                  type: 3,
                  cardd: card,
                })
              }
            >
              <Image source={{ uri: card.imagePath }} style={styles.image2} />
              <View style={styles.cardInfo}>
                <Text style={{ fontSize: 12, color: "#707070" }}>
                  {card.cardName}
                </Text>
                <Text
                  style={{ fontSize: 14, fontWeight: "600", flexShrink: 1 }}
                >
                  {card.info}
                </Text>
                <Text style={{ fontSize: 14, fontWeight: "800" }}>
                  {card.afterDiscount}
                  <Text style={{ fontSize: 12, fontWeight: "600" }}>
                    원 더 할인받아요!
                  </Text>
                </Text>
              </View>
            </Pressable>
          ))} */}
        <View style={styles.separator}></View>
      </View>
      {/* ))} */}
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
  },
  cardInfo: {
    flex: 1,
    marginLeft: 50,
  },
  mainContent: {},
  titleConatiner: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 30,
    marginBottom: 25,
    marginLeft: 25,
  },
  titleTextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  categoriesImage: {
    marginRight: 40,
    width: 70,
    height: 70,
  },
  cardContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
    marginTop: 15,
    width: "100%",
    marginLeft: 30,
  },
  horizontalImage: {
    width: 120,
    height: 60,
    marginLeft: 20,
  },
  verticalImage: {
    width: 60,
    height: 120,
    marginLeft: 55,
    marginRight: 15,
  },
  defaultImage: {
    width: 50,
    height: 80,
  },
});

export default PopularCard;
