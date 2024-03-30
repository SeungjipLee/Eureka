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

function SelectCardInfo() {
  const route = useRoute();
  const { cardId, type, cardd } = route.params;
  const [token, setToken] = useState("");
  const [cardInfo, setCardInfo] = useState([]);
  const navigation = useNavigation();

  console.log(cardId, "accccccccccccccccccc");
  console.log(type, "a");
  console.log(cardd, "c");
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
          console.log(res.data, "SelectCardInfo 성공");
        },
        (err) => {
          console.log("Error, SelectCardInfo 실패");
        }
      );
    }
  }, [token, cardId]);

  return (
    <ScrollView>
      <Pressable
        onPress={() => {
          if (type === 1) {
            navigation.navigate("ByCard");
          } else if (type === 2) {
            navigation.navigate("ByCategory");
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
      {/* <Image source={{ uri: card.cardImagePath }} style={styles.image}></Image> */}
      {/* <Text>{card.cardName}</Text> */}
      {cardInfo.map((card, index) => (
        <View key={index} style={styles.cardContainer}>
          <Text style={styles.cardTitle}>{card.title}</Text>
          <Text style={styles.cardInfo}>{card.info}</Text>
          <Text style={styles.cardDetail}>{card.infoDetail}</Text>
        </View>
      ))}
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
    marginBottom: 20,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  cardInfo: {
    fontSize: 14,
    marginTop: 5,
  },
  cardDetail: {
    fontSize: 12,
    marginTop: 5,
    color: "#666",
  },
  image: {
    width: 85,
    height: 55,
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 12,
  },
});
