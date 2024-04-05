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

  const scrollViewRef = useRef(null);
  const popularRef = useRef(null);
  const ddoraeRef = useRef(null);

  useEffect(() => {
    if (selectCardInfo) {
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
    if (token && userCardId) {
      getUserTop10(
        token,
        (res) => {
          setPopularCards(res.data.cardOwnershipList);
          // console.log(res.data.cardOwnershipList, "sdaasd");
        },
        (err) => {
          console.log("PopularCard, err", err);
        }
      );

      getDdoraeTop10(
        token,
        userCardId,
        (res) => {
          setDdoraeCards(res.data.cardOwnershipList);
        },
        (err) => {
          console.log("PopularCard, err", err);
        }
      );
    }
  }, [token, userCardId]);

  const scrollToSection = (sectionRef) => {
    if (sectionRef.current && scrollViewRef.current) {
      sectionRef.current.measureLayout(
        scrollViewRef.current,
        (x, y, width, height) => {
          scrollViewRef.current.scrollTo({ x: 0, y, animated: true });
        }
      );
    }
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
          <Text style={styles.subText}>유레카 인기카드와</Text>
          <Text style={styles.subText}>또래 인기카드를 가져왔어요</Text>
        </View>

        <Image
          source={require("../../../../assets/GrinningFace.png")}
          style={{ width: 100, height: 100 }}
        />
      </View>

      <View style={styles.topTabs}>
        <TouchableOpacity onPress={() => scrollToSection(popularRef)}>
          <Text style={styles.tabText}>인기카드</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => scrollToSection(ddoraeRef)}>
          <Text style={styles.tabText}>또래인기카드</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.separator}></View>
      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.contentContainer}
      >
        <View ref={popularRef}>
          <Text style={styles.sectionTitle}>인기카드</Text>
          {popularCards.map((card, index) => (
            <Pressable
              key={`popular_${card.cardId}_${index}`}
              style={styles.cardItem}
              onPress={() =>
                navigation.navigate("SelectCardInfo", {
                  cardId: card.cardId,
                  type: 5,
                })
              }
            >
              <View style={styles.cardImageContainer}>
                <Image
                  source={{ uri: card.imagePath }}
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.cardDetail}>
                <Text style={styles.cardName}>{card.cardName}</Text>
                <Text style={styles.cardInfo}>{card.info}</Text>
              </View>
            </Pressable>
          ))}
        </View>

        <View style={styles.separator} />

        <View ref={ddoraeRef}>
          <Text style={styles.sectionTitle}>또래인기카드</Text>
          {ddoraeCards.map((card, index) => (
            <Pressable
              key={`ddorae_${card.cardId}_${index}`}
              style={styles.cardItem}
              onPress={() =>
                navigation.navigate("SelectCardInfo", {
                  cardId: card.cardId,
                  type: 5,
                })
              }
            >
              <View style={styles.cardImageContainer}>
                <Image
                  source={{ uri: card.imagePath }}
                  style={styles.cardImage}
                />
              </View>
              <View style={styles.cardDetail}>
                <Text style={styles.cardName}>{card.cardName}</Text>
                <Text style={styles.cardInfo}>{card.info}</Text>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 25,
    fontWeight: "400",
    marginVertical: 10,
    marginLeft: 20,
    marginBottom: 30,
    marginTop: 25,
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  cardImageContainer: {
    width: 80, // 이미지 컨테이너 너비 설정
    height: 100, // 이미지 컨테이너 높이 설정
    marginRight: 15,
    justifyContent: "center", // 이미지를 중앙에 위치시킴
    alignItems: "center", // 이미지를 중앙에 위치시킴
  },
  cardImage: {
    width: 80,
    height: 100,
    resizeMode: "contain", // 원본 이미지 비율 유지
  },
  cardDetail: {
    flexDirection: "column",
    flex: 1,
  },
  cardName: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 5,
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
    height: 0.8,
    width: "95%",
    backgroundColor: "#d8d8d8",
    marginLeft: 10,
  },
});

export default PopularCard;
