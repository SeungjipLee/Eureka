import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Pressable,
  Image,
} from "react-native";
import { getProductCardListByCategory } from "../../../../apis/ProductApi";
import TokenUtils from "../../../../stores/TokenUtils";
import { useNavigation } from "@react-navigation/native";

function CategoryCardList() {
  // 상태를 배열이 아닌 객체로 초기화하면서, 내부에 data 배열을 포함시킴
  const [cards, setCards] = useState([]);
  const selectId = useSelector((state) => state.productList.value);
  const [token, setToken] = useState("");
  const navigation = useNavigation();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    // 토큰과 selectId가 유효할 때만 API 호출
    if (token && selectId) {
      getProductCardListByCategory(
        token,
        selectId,
        (res) => {
          setCards(res.data);
          console.log(res.data);
        },
        (err) => {
          console.log("Error, CategoryCardList", err);
        }
      );
    }
  }, [token, selectId]);

  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 500 }}>
      {cards.map((item) => (
        <Pressable
          onPress={() =>
            navigation.navigate("SelectCardInfo", {
              cardId: item.cardId,
              type: 2,
              cardd: item,
            })
          }
          key={item.cardId}
          style={styles.card}
        >
          <View style={styles.cardContainer}>
            <Image
              source={{ uri: item.cardImagePath }}
              style={[
                item.imageAttr === 0 ? styles.image : styles.image2,
                {
                  transform: item.imageAttr === 0 ? [{ rotate: "90deg" }] : [],
                },
              ]}
            />

            <View style={styles.textContainer}>
              <Text style={{ fontSize: 15, fontWeight: "600", flexShrink: 1 }}>
                {item.info}
              </Text>

              <Text
                style={{
                  fontSize: 14,
                  fontWeight: "400",
                  color: "#b6b6b6",
                  marginTop: 5,
                }}
              >
                {item.cardName}
              </Text>
            </View>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}

export default CategoryCardList;

const styles = StyleSheet.create({
  card: {},
  cardText: {
    marginBottom: 5,
  },
  cardContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
    marginTop: 25,
    marginLeft: 30,
  },
  textContainer: {
    marginLeft: 20,
    flex: 1,
  },
  image: {
    width: 85,
    height: 55,
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 12,
  },
  image2: {
    width: 60,
    height: 85,
    resizeMode: "contain",
    marginLeft: 10,
    marginRight: 11,
  },
});
