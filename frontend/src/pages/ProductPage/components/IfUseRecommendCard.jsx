import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
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
  const scrollViewRef = useRef(); // ScrollView 참조 생성
  const [currentPage, setCurrentPage] = useState(0); // 현재 페이지 상태

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
        },
        (err) => {
          console.log(err, "IfUseRecommendCard err");
        }
      );
    }
  }, [token, selectCard]);

  // 다음 카드로 이동
  const handleNext = () => {
    // 다음 페이지 인덱스 계산. 만약 현재 페이지가 마지막 카드라면, 첫 번째 카드(0)로 돌아갑니다.
    const nextPage = (currentPage + 1) % 2; // 카드가 두 개 뿐이므로, 2로 나눈 나머지를 사용
    scrollViewRef.current.scrollTo({
      x: nextPage * (CARD_WIDTH + 40), // 40은 각 카드 사이의 마진을 가정한 값
      animated: true,
    });
    setCurrentPage(nextPage);
  };

  // 이전 카드로 이동
  const handlePrev = () => {
    // 이전 페이지 인덱스 계산. 현재 페이지가 첫 번째 카드라면 마지막 카드로 이동합니다.
    const prevPage = (currentPage - 1 + 2) % 2; // 카드가 두 개 뿐이므로, 2로 나눈 나머지를 사용
    scrollViewRef.current.scrollTo({
      x: prevPage * (CARD_WIDTH + 40), // 40은 각 카드 사이의 마진을 가정한 값
      animated: true,
    });
    setCurrentPage(prevPage);
  };

  // 자동 슬라이드를 위한 useEffect
  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext(); // 3초마다 다음 카드로 자동 전환
    }, 4000);

    return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 인터벌 정리
  }, [currentPage]); // currentPage가 변경될 때마다 이펙트를 다시 실행

  return (
    <View style={styles.container}>
      <View style={styles.maintextContainer}>
        <Text style={styles.maintext}>
          김싸피님의 카드를 분석했어요 <Text style={styles.maintext}></Text>
        </Text>
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
          <View style={styles.card}>
            <Image
              source={{ uri: categoryCard.imagePath }}
              style={
                categoryCard.imgAttr === 0
                  ? styles.horizontalImage
                  : styles.verticalImage
              }
            />
            <Text style={{ marginTop: 10, fontSize: 10 }}>
              {categoryCard.cardName}
            </Text>
            <View style={styles.subTextContainer}>
              <Text style={styles.subText1}>
                {categoryCard.largeCategoryName
                  ? `${categoryCard.largeCategoryName}에서 많이 사용하셨네요!`
                  : ""}
              </Text>
              <Text style={styles.subText2}>추천카드를 사용하면</Text>
              <Text style={styles.subText2}>
                {categoryCard.afterDiscount - categoryCard.beforeDiscount}원 더
                할인받아요!
              </Text>
            </View>
          </View>

          <View style={styles.card}>
            <Image
              source={{ uri: ddoraeCard.imagePath }}
              style={
                ddoraeCard.imgAttr === 0
                  ? styles.horizontalImage
                  : styles.verticalImage
              }
            />
            <Text style={{ marginTop: 5 }}>{ddoraeCard.cardName}</Text>
            <View style={styles.subTextContainer}>
              <Text style={styles.subText1}>
                또래들이 많이 사용하는 카드에요!
              </Text>
              {/* <Text style={styles.subText2}>추천카드를 사용하면</Text>
              <Text style={styles.subText2}>
                {ddoraeCard.afterDiscount - ddoraeCard.beforeDiscount}원 더
                할인받아요!
              </Text> */}
            </View>
          </View>
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
    fontSize: 17,
    fontWeight: "400",
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
    paddingVertical: 20,
  },
  card: {
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
    width: CARD_WIDTH,
    marginHorizontal: 20,
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
  subText1: {
    fontSize: 13,
    fontWeight: "500",
    alignItems: "center",
  },
  subText2: {
    fontSize: 11,
    fontWeight: "400",
    alignItems: "center",
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
    backgroundColor: "#6c98ff",
    borderRadius: 15,
    marginTop: 30,
  },
  compareCardBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
  horizontalImage: {
    width: 100,
    height: 160, // 가로 이미지를 세로로 보이도록 높이를 조절
  },
  verticalImage: {
    width: 100,
    height: 160, // 세로 이미지의 경우 기본적으로 이 비율을 사용
  },
});
