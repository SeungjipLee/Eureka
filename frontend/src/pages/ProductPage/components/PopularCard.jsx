import React, { useEffect, useState, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  StatusBar,
  ScrollView,
  Image,
  TouchableOpacity,
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
  const [popularCards, setPopularCards] = useState([]);
  const [ddoraeCards, setDdoraeCards] = useState([]);

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
          console.log(res.data.cardOwnershipList, "Popularcard111111111111");
          setPopularCards(res.data);
        },
        (err) => {
          console.log("PopularCard, err", err);
        }
      );

      // getDdoraeTop10(
      //   token,
      //   userCardId,
      //   (res) => {
      //     setDdoraeCards(res.data);
      //     console.log(res.data, "DdoraeCard22222222222222222222");
      //   },
      //   (err) => {
      //     console.log("PopularCard, err", err);
      //   }
      // );
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

  const popularRef = useRef();
  const ddoraeRef = useRef();
  const scrollViewRef = useRef();

  // 특정 섹션으로 스크롤하는 함수
  const scrollToSection = (sectionRef) => {
    sectionRef.current.measureLayout(
      scrollViewRef.current,
      (x, y, width, height) => {
        scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
      }
    );
  };

  return (
    <View style={styles.container}>
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

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
      >
        <View style={styles.topTabs}>
          <TouchableOpacity onPress={() => scrollToSection(popularRef)}>
            <Text style={styles.tabText}>인기카드</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => scrollToSection(ddoraeRef)}>
            <Text style={styles.tabText}>또래추천카드</Text>
          </TouchableOpacity>
        </View>

        <View ref={popularRef}>
          <Text style={styles.sectionTitle}>인기카드</Text>
          {popularCards.map(
            (card, index) =>
              index < 5 && (
                <View key={card.cardId} style={styles.cardItem}>
                  <Image
                    source={{ uri: card.imagePath }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardName}>{card.cardName}</Text>
                  <Text style={styles.cardInfo}>{card.info}</Text>
                </View>
              )
          )}
        </View>
        <View style={styles.separator} />

        {/* <View ref={ddoraeRef}>
          <Text style={styles.sectionTitle}>또래추천카드</Text>
          {ddoraeCards.map(
            (card, index) =>
              index < 5 && (
                <View key={card.cardId} style={styles.cardItem}>
                  <Image
                    source={{ uri: card.imagePath }}
                    style={styles.cardImage}
                  />
                  <Text style={styles.cardName}>{card.cardName}</Text>
                  <Text style={styles.cardInfo}>{card.info}</Text>
                </View>
              )
          )}
        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  // 스타일 정의 부분
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  contentContainer: {
    paddingBottom: 50,
  },
  topTabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
    marginBottom: 20,
  },
  tabText: {
    fontSize: 18,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "700",
    marginVertical: 10,
    marginLeft: 10,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  cardImage: {
    width: 100,
    height: 60,
    marginRight: 10,
  },
  cardName: {
    fontSize: 18,
    fontWeight: "600",
  },
  cardInfo: {
    fontSize: 14,
    color: "#666",
  },
  separator: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
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
  separator: {
    height: 0.7,
    width: "95%",
    backgroundColor: "#d8d8d8",
    marginLeft: 10,
    marginTop: 25,
    marginBottom: 35,
  },
});

export default PopularCard;
