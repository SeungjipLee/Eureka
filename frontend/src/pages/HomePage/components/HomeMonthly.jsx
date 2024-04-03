import { StyleSheet, View, Text, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation, useFocusEffect  } from "@react-navigation/native";
import TokenUtils from "../../../stores/TokenUtils";
import React, { useState, useEffect, useCallback  } from "react";
import { getHomeInfo } from "../../../apis/HomeApi";

function HomeMonthly() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const currentDate = new Date();
  const currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const currentYear = currentDate.getFullYear().toString();
  const [warning, setWarning] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [payAmount, setPayAmount] = useState(0);

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  useFocusEffect(
    useCallback(() => {
      if (token) { // 토큰이 있을 때만 getHomeInfo 호출
        getHomeInfo(
          token,
          currentYear + currentMonth,
          (res) => {
            setWarning(false);
            setDiscount(res.data.totalDiscount);
            setPayAmount(res.data.totalConsumption);
          },
          (err) => {
            if (err.response.status === 404) {
              console.log(err.response.status);
              setDiscount(0)
              setPayAmount(0)
              setWarning(true);
            }
          }
        );
      }
    }, [token, currentMonth, currentYear])
  );

  return (
    <Pressable onPress={() => navigation.navigate("StatisticsPage")}>
    <View style={styles.container}>
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View>
            <Text style={styles.subtitle}>이번달 할인 & 소비</Text>
            {warning && (
              <Text style={{ color: "red", marginStart: 12 }}>
                현재 등록된 카드가 없습니다.
              </Text>
            )}
          </View>
            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              style={styles.nextBtn}
            />
        </View>
        <View style={styles.midcontainer}>
          <Image style={styles.image} source={require('../../../../assets/HomeIcon/Discount.png')}/>
          <View>
            <Text style={styles.font}>총 할인 예상 금액</Text>
            <Text style={styles.price}>{discount.toLocaleString()}원</Text>
          </View>
          <View></View>
        </View>
        <View style={styles.midcontainer}>
          <Image style={styles.image} source={require('../../../../assets/HomeIcon/CoinWallet.png')}/>
          <View>
            <Text style={styles.font}>총 결제 예상 금액</Text>
            <Text style={styles.price}>{payAmount.toLocaleString()}원</Text>
          </View>
          <View></View>
          
        </View>
    </View>
    </Pressable>
  );
}

export default HomeMonthly;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: 280,
    borderWidth: 2,
    borderColor: "#D7D7D7",
    borderRadius: 20,
    padding: 12,
    paddingTop: 20,
    shadowColor: "#D7D7D7",
    backgroundColor: "#ffffff",
  },
  subtitle: {
    fontWeight: "bold",
    fontSize: 20,
    marginTop: 12,
    marginStart: 12,
  },
  midcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: 80,
    alignItems: "center",
    padding: 20,
    marginTop: 12,
  },
  image: {
    width: 50,
    height: 50,
    marginLeft: 20,
    marginEnd: 20,
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
    marginTop: 15,
    marginLeft: 10,
  },
});
