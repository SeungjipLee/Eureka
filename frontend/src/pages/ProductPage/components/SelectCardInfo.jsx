import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import TokenUtils from "../../../stores/TokenUtils";
import { getProductCardDetail } from "../../../apis/ProductApi";
import { Linking } from "react-native";

function SelectCardInfo() {
  const route = useRoute();
  const { cardId, type, cardd } = route.params;
  const [token, setToken] = useState("");
  const [cardInfo, setCardInfo] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, [cardId]);

  useEffect(() => {
    // 토큰과 cardId가 유효할 때만 API 호출
    if (token && cardId) {
      getProductCardDetail(
        token,
        cardId,
        (res) => {
          setCardInfo(res.data);
        },
        (err) => {
          console.log("SelectCardInfo, 카드디테일실패", err);
        }
      );
    }
  }, [token, cardId]);

  const getImageStyle = (imgAttr) => {
    switch (imgAttr) {
      case 0: // 가로
        return styles.horizontalImage;
      case 1: // 세로
        return styles.verticalImage;
      default:
        return styles.horizontalImage;
    }
  };

  return (
    <ScrollView>
      <Pressable
        onPress={() => {
          if (type === 1) {
            navigation.navigate("ByCard");
          } else if (type === 2) {
            navigation.navigate("ByCategory");
          } else if (type === 3) {
            navigation.navigate("FitYourConsumption");
          } else if (type === 4) {
            navigation.navigate("CurrentBenefitMore");
          }
        }}
        style={{ alignSelf: "flex-start" }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={40}
          style={styles.nextBtn}
        />
      </Pressable>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: cardInfo.imagePath }}
          style={getImageStyle(cardInfo.imgAttr)}
        ></Image>

        <Text style={{ marginTop: 15, fontSize: 23, fontWeight: "600" }}>
          {cardInfo.cardName}
        </Text>
      </View>

      <Text
        style={{
          fontSize: 20,
          fontWeight: "400",
          marginLeft: 25,
          marginBottom: 20,
          marginTop: 25,
        }}
      >
        주요혜택
      </Text>
      <View style={styles.separator}></View>
      {cardInfo.list &&
        cardInfo.list.map((card, index) => (
          <View key={index} style={styles.cardContainer}>
            <Text style={styles.cardInfo}>{card.info}</Text>
          </View>
        ))}

      <Pressable
        onPress={() => {
          if (cardInfo.joinPath) {
            Linking.openURL(cardInfo.joinPath).catch((err) => {
              console.error("Failed opening page because: ", err);
              alert("해당 페이지를 열 수 없습니다.");
            });
          }
        }}
        style={styles.applyButton}
      >
        {type === 4 ? (
          <Text style={styles.applyButtonText}>해당 카드사 홈페이지 가기</Text>
        ) : (
          <Text style={styles.applyButtonText}>온라인 신청하기</Text>
        )}
      </Pressable>
    </ScrollView>
  );
}

export default SelectCardInfo;

const styles = StyleSheet.create({
  nextBtn: {
    marginTop: 30,
    marginBottom: 20,
    color: "#b0b0b0",
  },
  cardContainer: {
    marginTop: 20,
    padding: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardInfo: {
    fontSize: 16,
    fontWeight: "400",
    marginLeft: 15,
  },
  cardDetail: {
    fontSize: 12,
    color: "#666",
  },
  image: {
    width: 85,
    height: 55,
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 12,
  },
  horizontalImage: {
    width: 180, // 가로 이미지의 크기 조정
    height: 140,
    resizeMode: "contain",
  },
  verticalImage: {
    width: 140, // 세로 이미지의 크기 조정
    height: 180,
    resizeMode: "contain",
  },
  contentContainer: {
    alignItems: "center",
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 15,
    marginTop: 12,
  },
  applyButton: {
    backgroundColor: "#95c0f0", // 연한 파란색
    paddingVertical: 12, // 버튼의 세로 패딩
    paddingHorizontal: 20, // 버튼의 가로 패딩
    borderRadius: 25, // 버튼의 모서리를 둥글게
    alignSelf: "center", // 버튼을 중앙에 위치
    marginTop: 20, // 상단 여백
    marginBottom: 20, // 하단 여백
  },
  applyButtonText: {
    color: "#FFFFFF", // 글자색은 흰색
    fontSize: 16, // 글자 크기
    textAlign: "center", // 글자를 중앙 정렬
  },
  separator: {
    height: 0.7,
    width: "95%",
    backgroundColor: "#a2a2a2",
    marginLeft: 10,
  },
});
