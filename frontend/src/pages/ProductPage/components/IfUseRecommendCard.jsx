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
  const [dorreCard, setDdorreCard] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0); // 현재 인덱스 상태 관리
  const scrollViewRef = useRef(); // ScrollView 참조
  const autoScrollRef = useRef();
  const selectCard = useSelector(
    (state) => state.productList.selectPayCardInfo
  );

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
          setCards(cardsData);
        },
        (err) => {
          console.log(err, "IfUseRecommendCard err");
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

  useEffect(() => {
    if (cards.length > 1) {
      startAutoScroll();
    }
    return () => stopAutoScroll();
  }, [cards.length]);

  const startAutoScroll = () => {
    if (cards.length <= 1) return;
    stopAutoScroll();
    autoScrollRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % cards.length;
        scrollTo(nextIndex, true);
        return nextIndex;
      });
    }, 5000);
  };

  const stopAutoScroll = () => {
    if (autoScrollRef.current) {
      clearInterval(autoScrollRef.current);
    }
  };

  const resetAutoScroll = () => {
    stopAutoScroll();
    startAutoScroll();
  };

  return (
    <View style={styles.container}>
      <View style={styles.maintextContainer}>
        <Text style={styles.maintext}>
          김싸피님의 카드를 분석했어요 <Text style={styles.maintext}></Text>
        </Text>
        <Text style={styles.maintext}>이런 카드는 어떠세요?</Text>
      </View>

      <View style={styles.carouselContainer}>
        <TouchableOpacity onPress={handleLeftPress} style={styles.arrowButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          decelerationRate="normal"
          style={styles.midContainer}
          ref={scrollViewRef}
        >
          {cards.map((card, index) => (
            <View
              key={index}
              style={[
                styles.card,
                index === 0 ? { marginLeft: 20 } : {},
                index === cards.length - 1 ? { marginRight: 20 } : {},
              ]}
            >
              <Image
                source={{ uri: card.imagePath }}
                style={
                  card.imgAttr === 0
                    ? styles.horizontalImage
                    : styles.verticalImage
                }
              />
              <Text style={{ marginTop: 5 }}>{card.cardName}</Text>
              <View style={styles.subTextContainer}>
                <Text style={styles.subText}>
                  {card.largeCategoryName}에서 많이사용하셨네요!
                </Text>
                <Text style={styles.subText}>추천카드를 사용하면</Text>
                <Text style={styles.subText}>
                  {card.afterDiscount - card.beforeDiscount}원 더 할인받아요!
                </Text>
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
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
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
  subText: {
    fontSize: 16,
    fontWeight: "600",
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
