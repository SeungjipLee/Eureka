import React, { useState, useEffect } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TokenService from "../../../stores/TokenUtils";
import { useDispatch } from "react-redux";
import { getUerInfo } from "../../../slices/userSlice";

function HomeForYou() {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const today = new Date();
  const dateString = today.toLocaleDateString("ko-KR", {
    year: "numeric",
    month: "long",
    day: "numeric",
    weekday: "long",
  });
  const [userName, setUserName] = useState("");

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await TokenService.getUserData();
      if (userData && userData.userName) {
        setUserName(userData.userName);
        dispatch(getUerInfo(userData));
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.date}>{dateString}</Text>
        <Text style={styles.subtitle}>{userName} 님을 위해 준비했어요</Text>
      </View>
      <Pressable onPress={() => navigation.navigate("Compare")}>
        <View style={styles.midcontainer}>
          <Image
            style={styles.image}
            source={require("../../../../assets/HomeIcon/BarChart.png")}
          />
          <View>
            <Text style={{ fontSize: 16, fontWeight: "400", marginLeft: 15 }}>
              또래와 소비 비교해보기
            </Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            style={styles.nextBtn}
          />
        </View>
      </Pressable>
      <Pressable onPress={() => navigation.navigate("ProductPage")}>
        <View style={styles.midcontainer}>
          <Image
            style={styles.image}
            source={require("../../../../assets/HomeIcon/BankCards.png")}
          />
          <View>
            <Text style={styles.font}>내 소비에 맞는 카드</Text>
            <Text style={styles.font}>추천 받기</Text>
          </View>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            style={styles.nextBtn}
          />
        </View>
      </Pressable>
    </View>
  );
}

export default HomeForYou;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: 280,
    borderWidth: 2,
    borderColor: "#D7D7D7",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingTop: 20,
    backgroundColor: "#ffffff",
    // iOS Shadow Properties
    shadowColor: "#000", // A darker shadow for better contrast and visibility
    shadowOffset: { width: 0, height: 2 }, // Positioning the shadow to appear beneath the container
    shadowOpacity: 0.25, // Adjusting opacity to ensure the shadow is noticeable yet subtle
    shadowRadius: 3.84, // The blur radius; a higher number results in a softer shadow
    // Android Shadow Property
    elevation: 5, // This property elevates the container, creating a shadow for a 3D effect
  },

  date: {
    color: "#828282",
    marginHorizontal: 12,
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 16,
    marginHorizontal: 12,
    marginVertical: 6,
  },
  midcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    alignItems: "center",
    padding: 12,
    marginTop: 12,
  },
  image: {
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  font: {
    fontSize: 16,
    fontWeight: "400",
  },
  price: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#6797ff",
  },
  nextBtn: {
    start: "end",
  },
});
