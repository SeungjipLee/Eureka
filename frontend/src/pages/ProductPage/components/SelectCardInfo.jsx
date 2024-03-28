import React, { useEffect, useState } from "react";
import { StyleSheet, ScrollView, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useRoute } from "@react-navigation/native";
import TokenUtils from "../../../stores/TokenUtils";
import { getProductCardDetail } from "../../../apis/ProductApi";

function SelectCardInfo() {
  const route = useRoute();
  const { cardId } = route.params;
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
          console.log(res.data, "hi");
        },
        (err) => {
          console.log("Error, CardInfoDetail");
        }
      );
    }
  }, [token, cardId]);

  return (
    <ScrollView>
      <Pressable
        onPress={() => navigation.navigate("ByCard")}
        style={{ alignSelf: "flex-start" }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={40}
          style={styles.nextBtn}
        />
      </Pressable>
      <Text>Selected Card ID: {cardId}</Text>
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
});
