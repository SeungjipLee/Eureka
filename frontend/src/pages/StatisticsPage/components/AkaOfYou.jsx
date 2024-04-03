import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  Image,
  Pressable,
} from "react-native";
import TokenUtils from "../../../stores/TokenUtils";
import { useNavigation } from "@react-navigation/native";
import { getMyTags } from "../../../apis/StatisticsApi";

const SCREEN_WIDTH = Dimensions.get("window").width;

function AkaOfYou() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      getMyTags(
        token,
        (res) => {
          console.log(res.data, "AkaOfYou");
        },
        (err) => {
          console.log(err, "AkaOfYou err");
        }
      );
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.noticeContainer}>
        <Text style={styles.AkaText}>3월달의 당신은</Text>
        <View style={styles.akaContainer}>
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>FoodFighter </Text>
          <Text style={styles.AkaText}>에요</Text>
        </View>
      </View>

      <View style={styles.akaCard}>
        <Image
          source={require("../../../../assets/foodfighter.png")}
          style={styles.image}
        ></Image>
        <View style={styles.contentContainer}>
          <Text style={{ fontSize: 25, fontWeight: "bold" }}>FoodFighter</Text>
        </View>
      </View>
      <View style={styles.getAka}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>칭호획득!</Text>
      </View>

      <View style={styles.seeMoreAka}>
        <Pressable onPress={() => navigation.navigate("MyAkaList")}>
          <Text style={{ color: "#0050FF", textDecorationLine: "underline" }}>
            칭호 더보기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AkaOfYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: SCREEN_WIDTH - 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  noticeContainer: {
    marginTop: 10,
    marginRight: 50,
  },
  akaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  AkaText: {
    fontSize: 23,
    fontWeight: "400",
    color: "black",
  },
  akaCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
    height: 80,
    width: 270,
    backgroundColor: "#FFFCBA",
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  getAka: {
    marginTop: 15,
  },
  seeMoreAka: {
    marginTop: 25,
  },
  image: {
    height: 60,
    width: 80,
    marginRight: 20,
  },
  contentContainer: {
    marginRight: 10,
  },
});
