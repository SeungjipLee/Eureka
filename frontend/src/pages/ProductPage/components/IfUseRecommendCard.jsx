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
  const [cards, setCards] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스 상태 관리
  const scrollViewRef = useRef(); // ScrollView 참조
  const autoScrollRef = useRef();
  const selectCard = useSelector(
    (state) => state.productList.selectPayCardInfo
  );

  console.log(selectCard, "cehci");

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
          console.log(res.data, "3개의 추천 카드 캐러셀 성공");
          // 데이터가 배열이 아닌 경우 배열로 만들어주는 로직 추가
          const cardsData = Array.isArray(res.data) ? res.data : [res.data];
          setCards(cardsData);
        },
        (err) => {
          console.log(err, "3개의 추천카드 케러셀 실패");
        }
      );
    }
  }, [token, selectCard]);

  const scrollTo = (index) => {
    setCurrentIndex(index);
    scrollViewRef.current.scrollTo({
      x: (CARD_WIDTH + 40) * index,
      animated: true,
    });
  };

  // 왼쪽 버튼 핸들러
  const handleLeftPress = () => {
    if (currentIndex > 0) {
      scrollTo(currentIndex - 1);
    }
    resetAutoScroll();
  };

  const handleRightPress = () => {
    const nextIndex = (currentIndex + 1) % 3; // 여기서 3은 카드의 개수입니다. 실제 카드 개수에 맞게 조정해야 합니다.
    scrollTo(nextIndex);
    resetAutoScroll();
  };

  // 자동 스크롤 기능
  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll(); // 컴포넌트가 언마운트될 때 자동 스크롤 중지
  }, []); // 빈 배열을 전달하여 컴포넌트 마운트 시에만 실행

  // 자동 스크롤 시작
  const startAutoScroll = () => {
    stopAutoScroll(); // 기존에 실행중인 자동 스크롤이 있다면 중지
    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        scrollTo(nextIndex % 3, true); // 카드의 개수(여기서는 3)에 맞춰 인덱스를 조정
        return nextIndex % 3;
      });
    }, 5000); // 3초마다 실행
  };

  // 자동 스크롤 중지
  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  // 자동 스크롤 리셋
  const resetAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };

  return (
    <View style={styles.container}>
      <View style={styles.maintextContainer}>
        <Text style={styles.maintext}>
          김싸피님! <Text style={styles.maintext}>이번달에는</Text>
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          대중교통<Text style={styles.maintext}>에서 많이 사용하셨네요!</Text>
        </Text>
      </View>

      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={handleLeftPress} style={styles.arrowButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="normal" // 또는 원하는 값으로 조절
          style={styles.midContainer}
          ref={scrollViewRef} // ScrollView 참조 설정
        >
          {cards.map((card, index) => (
            <View key={index} style={styles.card}>
              <Image
                source={{ uri: card.imagePath }}
                style={{ width: 160, height: 100 }}
              />
              <View style={styles.subTextContainer}>
                <Text style={styles.subText}>추천카드를 사용하면</Text>
                <Text style={styles.subText}>3,300원 더 할인받아요!</Text>
                <Text>{card.cardName}</Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <TouchableOpacity onPress={handleRightPress} style={styles.arrowButton}>
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
    marginTop: 20,
    paddingHorizontal: 10,
    height: 300,
    width: "100%",
  },

  midContainer: {
    flex: 1,
  },
  card: {},
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  arrowButton: {
    padding: 10,
  },
  subTextContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontSize: 16,
    fontWeight: "600",
  },
  compareCard: { justifyContent: "center", alignItems: "center" },
  compareCardBtn: {
    justifyContent: "center",
    alignItems: "center",
    width: 200,
    height: 50,
    backgroundColor: "#6c98ff",
    borderRadius: 15,
  },
  compareCardBtnText: {
    fontSize: 15,
    fontWeight: "600",
    color: "white",
  },
});
