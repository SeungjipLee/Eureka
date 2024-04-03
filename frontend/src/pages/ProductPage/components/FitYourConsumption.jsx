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
import { getConsumptionCompareTop3 } from "../../../apis/ProductApi";

const categoryImages = {
  모든가맹점: require("../../../../assets/CategoryIcon/0.png"),
  대중교통: require("../../../../assets/CategoryIcon/1.png"),
  주유: require("../../../../assets/CategoryIcon/2.png"),
  마트: require("../../../../assets/CategoryIcon/3.png"),
  편의점: require("../../../../assets/CategoryIcon/4.png"),
  통신: require("../../../../assets/CategoryIcon/5.png"),
  온라인쇼핑: require("../../../../assets/CategoryIcon/6.png"),
  쇼핑: require("../../../../assets/CategoryIcon/7.png"),
  배달앱: require("../../../../assets/CategoryIcon/8.png"),
  음식점: require("../../../../assets/CategoryIcon/9.png"),
  주점: require("../../../../assets/CategoryIcon/10.png"),
  카페: require("../../../../assets/CategoryIcon/11.png"),
  디저트: require("../../../../assets/CategoryIcon/12.png"),
  "뷰티/피트니스": require("../../../../assets/CategoryIcon/13.png"),
  공과금: require("../../../../assets/CategoryIcon/14.png"),
  "병원/약국": require("../../../../assets/CategoryIcon/15.png"),
  애완동물: require("../../../../assets/CategoryIcon/16.png"),
  교육: require("../../../../assets/CategoryIcon/17.png"),
  자동차: require("../../../../assets/CategoryIcon/18.png"),
  "레저/스포츠": require("../../../../assets/CategoryIcon/19.png"),
  영화: require("../../../../assets/CategoryIcon/20.png"),
  "문화/여가": require("../../../../assets/CategoryIcon/21.png"),
  간편결제: require("../../../../assets/CategoryIcon/22.png"),
  항공: require("../../../../assets/CategoryIcon/23.png"),
  "여행/숙박": require("../../../../assets/CategoryIcon/24.png"),
  기타: require("../../../../assets/CategoryIcon/25.png"),
};

function FitYourConsumption() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const selectCardInfo = useSelector(
    (state) => state.productList.selectPayCardInfo
  );
  const [selectCardInfoImage, setSelectCardInfoImage] = useState("");
  const [selectCardInfoImgAttr, setSelectCardInfoImgAttr] = useState("");
  const [userCardId, setUserCardId] = useState("");
  const [cards, setCards] = useState([]);
  useEffect(() => {
    if (selectCardInfo) {
      setSelectCardInfoImage(selectCardInfo.imagePath);
      setSelectCardInfoImgAttr(selectCardInfo.imgAttr);
      setUserCardId(selectCardInfo.userCardId);
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
      getConsumptionCompareTop3(
        token,
        userCardId,
        (res) => {
          setCards(res.data.tlcnrList);
          console.log(res.data.tlcnrList[0].list, "check");
        },
        (err) => {
          console.log("FitYourConsumption, err", err);
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

      {cards.map((category, index) => (
        <View key={index} style={styles.mainContent}>
          <View style={styles.titleConatiner}>
            <View style={styles.titleTextContainer}>
              <Text style={{ fontSize: 18, fontWeight: "700", marginTop: 15 }}>
                {category.largeCategoryName}할인 BEST
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
            <Image
              source={
                categoryImages[category.largeCategoryName]
                  ? categoryImages[category.largeCategoryName]
                  : require("../../../../assets/favicon.png")
              }
              style={styles.categoriesImage}
            ></Image>
          </View>

          {category.list.map((card, cardIdx) => (
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

export default FitYourConsumption;
