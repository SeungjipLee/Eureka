import React, { useState, useEffect, useCallback } from "react";
import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import TokenUtils from "../../../stores/TokenUtils";
import { getHomeInfo } from "../../../apis/HomeApi";

function HomeOnlyPay() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const currentDate = new Date();
  const currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const currentYear = currentDate.getFullYear().toString();
  const [payAmount, setPayAmout] = useState(0);

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };
    fetchToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (token) {
        getHomeInfo(
          token,
          currentYear + currentMonth,
          (res) => {
            setPayAmout(res.data.payApprovedAmt);
          },
          (err) => console.log(err.response ? err.response.status : err)
        );
      }
    }, [token, currentYear, currentMonth])
  );

  return (
    <View>
      <View style={styles.container}>
        <Pressable onPress={() => navigation.navigate("OnlyPay")}>
          <View style={styles.midcontainer}>
            <Image
              style={styles.image}
              source={require("../../../../assets/HomeIcon/CardPayment.png")}
            />
            <View>
              <Text style={styles.font}>이번달 페이 결제 금액</Text>
              <Text style={styles.price}>{payAmount.toLocaleString()}원</Text>
            </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              style={styles.nextBtn}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

export default HomeOnlyPay;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: 105,
    borderWidth: 2,
    borderColor: "#D7D7D7",
    borderRadius: 20,
    paddingHorizontal: 12,
    backgroundColor: "#ffffff",
    // iOS Shadow Properties
    shadowColor: "#000", // A darker shadow color for better contrast
    shadowOffset: { width: 0, height: 2 }, // This creates a shadow below the container
    shadowOpacity: 0.25, // Adjust the opacity to make the shadow more subtle or pronounced
    shadowRadius: 3.84, // The blur radius of the shadow; higher values make a softer shadow
    // Android Shadow Property
    elevation: 5, // Adds depth with a shadow, making the container stand out
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
  },
  price: {
    fontWeight: "bold",
    fontSize: 24,
    color: "#6797ff",
    alignSelf: "flex-end",
  },
  nextBtn: {
    start: "end",
  },
});
