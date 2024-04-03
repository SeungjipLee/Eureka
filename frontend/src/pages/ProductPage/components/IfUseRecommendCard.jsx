import React, { useRef, useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
  Pressable,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { get3RecommendCard } from "../../../apis/ProductApi";
import TokenUtils from "../../../stores/TokenUtils";
import { recommendCateCardProfit } from "../../../slices/productSlice";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 80) / 2;

function IfUseRecommendCard() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [categoryCard, setCategoryCard] = useState([]);
  const [ddoraeCard, setDdoraeCard] = useState([]);
  const selectCard = useSelector(
    (state) => state.productList.selectPayCardInfo
  );
  // const userInformation = useSelector((state) => state.userInfo.value);
  const dispatch = useDispatch();
  const scrollViewRef = useRef();
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getRefreshToken();
      setToken(accessToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token && selectCard) {
      const selectCardUserCardId = selectCard.userCardId;
      get3RecommendCard(
        token,
        selectCardUserCardId,
        (res) => {
          const cardsData = Array.isArray(res.data) ? res.data : [res.data];
          setCategoryCard(cardsData[0].categoryCard);
          setDdoraeCard(cardsData[0].ddoraeCard);
          // console.log(selectCardUserCardId, "IfuseReco, cardid");
          dispatch(recommendCateCardProfit(cardsData[0].categoryCard));
        },
        (err) => {
          console.log(err, "IfUseRecommendCard err");
        }
      );
    }
  }, [token, selectCard]);

  const handleNext = () => {
    const nextPage = (currentPage + 1) % 2;
    scrollViewRef.current.scrollTo({
      x: nextPage * (CARD_WIDTH + 40),
      animated: true,
    });
    setCurrentPage(nextPage);
  };

  const handlePrev = () => {
    const prevPage = (currentPage - 1 + 2) % 2;
    scrollViewRef.current.scrollTo({
      x: prevPage * (CARD_WIDTH + 40),
      animated: true,
    });
    setCurrentPage(prevPage);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 4500);

    return () => clearInterval(intervalId);
  }, [currentPage]);

  const getImageStyle = (imgAttr) => {
    if (imgAttr === 0) {
      return [styles.horizontalImage, { transform: [{ rotate: "90deg" }] }];
    } else {
      return styles.verticalImage;
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.maintextContainer}>
        <Text style={styles.maintext}>내 카드를 분석했어요!</Text>
        <Text style={styles.maintext}>이런 카드는 어떠세요?</Text>
      </View>

      <View style={styles.carouselContainer}>
        <TouchableOpacity style={styles.arrowButton} onPress={handlePrev}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView
          ref={scrollViewRef}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="normal"
          style={styles.midContainer}
        >
          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("CompareCard")}
          >
            <Text style={{ marginBottom: 10, fontSize: 11, fontWeight: "600" }}>
              {categoryCard.cardName ? (
                categoryCard.cardName.length > 20 ? (
                  `${categoryCard.cardName.substring(0, 20)}...`
                ) : (
                  categoryCard.cardName
                )
              ) : (
                <Text
                  style={{ marginBottom: 10, fontSize: 11, fontWeight: "600" }}
                >
                  {" "}
                  이 카드를 추천해요!
                </Text>
              )}
            </Text>

            <Image
              source={{ uri: categoryCard.imagePath }}
              style={getImageStyle(categoryCard.imgAttr)}
            ></Image>

            <View style={styles.subTextContainer}>
              {categoryCard.largeCategoryName && (
                <>
                  <Text style={{ fontSize: 15, fontWeight: "500" }}>
                    {`${categoryCard.largeCategoryName}`}{" "}
                    <Text style={styles.subText1}>에서</Text>
                  </Text>
                  <Text style={styles.subText1}>많이 사용하셨네요!</Text>
                </>
              )}
              <Text style={styles.subText2}>추천카드를 사용하면</Text>
              <Text
                style={{ fontSize: 14, fontWeight: "400", color: "#71b4f3" }}
              >
                {categoryCard.afterDiscount - categoryCard.beforeDiscount}
                <Text style={{ fontSize: 12 }}>원 더 할인받아요!</Text>
              </Text>
            </View>
          </Pressable>

          <Pressable
            style={styles.card}
            onPress={() => navigation.navigate("CompareCard")}
          >
            <Text style={{ marginBottom: 10, fontSize: 11, fontWeight: "600" }}>
              {ddoraeCard.cardName ? (
                ddoraeCard.cardName.length > 20 ? (
                  `${ddoraeCard.cardName.substring(0, 20)}...`
                ) : (
                  ddoraeCard.cardName
                )
              ) : (
                <Text
                  style={{ marginBottom: 10, fontSize: 11, fontWeight: "600" }}
                >
                  {" "}
                  이 카드를 추천해요!
                </Text>
              )}
            </Text>
            <Image
              source={{ uri: ddoraeCard.imagePath }}
              style={
                ddoraeCard.imgAttr === 0
                  ? styles.horizontalImage
                  : styles.verticalImage
              }
            />
            <View style={styles.subTextContainer2}>
              <Text style={styles.subText3}>현재 또래들이 많이</Text>
              <Text style={styles.subText3}>사용하는 카드에요!</Text>
            </View>
          </Pressable>
        </ScrollView>

        <TouchableOpacity style={styles.arrowButton} onPress={handleNext}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>

      <View style={styles.compareCard}>
        <Pressable
          onPress={() => navigation.navigate("CompareCard")}
          style={styles.compareCardBtn}
        >
          <Text style={styles.compareCardBtnText}>내 카드랑 비교하기</Text>
        </Pressable>
      </View>
    </View>
  );
}

export default IfUseRecommendCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "80%",
  },
  maintext: {
    fontSize: 19,
    fontWeight: "400",
    textAlign: "center", // 텍스트 가운데 정렬
    lineHeight: 22, // 줄 간격 조절
  },
  maintextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    paddingHorizontal: 10,
    height: 300,
    width: "100%",
  },
  midContainer: {
    flex: 1,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: CARD_WIDTH,
    marginHorizontal: 20,
    marginTop: 10,
  },
  arrowButton: {
    padding: 15,
    marginBottom: 70,
  },
  subTextContainer: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  subTextContainer2: {
    marginTop: 35,
    marginBottom: 15,
    justifyContent: "center",
    alignItems: "center",
  },
  subText1: {
    fontSize: 13,
    fontWeight: "500",
  },
  subText2: {
    marginTop: 10,
    fontSize: 11,
    fontWeight: "400",
  },
  subText3: {
    fontSize: 16,
    fontWeight: "500",
  },
  compareCard: {
    justifyContent: "center",
    alignItems: "center",
  },
  compareCardBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 50,
    backgroundColor: "#5386ff",
    borderRadius: 15,
    marginTop: 30,
  },
  compareCardBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
  horizontalImage: {
    width: 160,
    height: 100, // 가로 이미지를 세로로 보이도록 높이를 조절
  },
  verticalImage: {
    width: 100,
    height: 160, // 세로 이미지의 경우 기본적으로 이 비율을 사용
  },
});
