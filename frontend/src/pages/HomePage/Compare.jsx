import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getCompare } from "../../apis/HomeApi";
import TokenUtils from "../../stores/TokenUtils";
import { CATEGORY } from "../../utils/ImagePath";

function Compare() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [userAmt, setUserAmt] = useState(0);
  const [anotherAmt, setAnotherAmt] = useState(0);
  const [maxAmount, setMaxAmount] = useState(1);
  const [data, setData] = useState([]);
  const [compareAmt, setCompareAmt] = useState(0);
  const [maxDifferenceIndex, setMaxDifferenceIndex] = useState(-1);

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      getCompare(
        token,
        (res) => {
          const numAge = parseInt(res.data.age, 10);
          setAge(numAge);
          setGender(res.data.gender);
          setAnotherAmt(res.data.anotherAmt);
          setUserAmt(res.data.userAmt);
          setData(res.data.data);
          setMaxAmount(Math.max(res.data.anotherAmt, res.data.userAmt));

          const compareAmt = parseInt(
            (res.data.userAmt - res.data.anotherAmt) / 10000,
            10
          );
          setCompareAmt(compareAmt);

          let maxDifference = -Infinity;
          let index = -1;
          res.data.data.forEach((item, i) => {
            const difference = item.userPay - item.comparePay;
            if (difference > maxDifference) {
              maxDifference = difference;
              index = i;
            }
          });
          setMaxDifferenceIndex(index);
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }, [token]);

  const peerBarHeight = parseInt((anotherAmt / maxAmount) * 160, 10);
  const myBarHeight = parseInt((userAmt / maxAmount) * 160, 10);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backcontainer}>
        <Pressable onPress={() => navigation.navigate("Home")}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={50}
            color="#B8B8B8"
          />
        </Pressable>
        <Text style={styles.title}>또래와 소비 비교해보기</Text>
      </View>

      <View style={styles.midcontainer}>
        <Text
          style={[styles.tag, { backgroundColor: "#BBF3FF", color: "#0050FF" }]}
        >
          {gender === "0" ? "여성" : "남성"}
        </Text>
        <Text
          style={[styles.tag, { backgroundColor: "#BBFFBE", color: "#0C9B00" }]}
        >
          {age * 10}대
        </Text>
      </View>

      <View>
        <Text style={styles.title2}>
          지난 달에 또래
          {compareAmt === 0 ? "와 비슷한 금액을 소비했어요!" : "보다  "}
        {compareAmt === 0 ? (
          ""
        ) : (
          <Text style={styles.title2}>
            {compareAmt > 0 ? compareAmt : compareAmt * -1}
            만원을 {compareAmt > 0 ? "더" : "덜"} 썼어요!
          </Text>
        )}
        </Text>
      </View>

      <View
        style={{
          marginVertical: 20,
          alignSelf: "center",
          flexDirection: "row",
          backgroundColor: "#ffffff",
          width: "90%",
          paddingHorizontal: 80,
          borderRadius: 20,
          elevation: 5,
        }}
      >
        <View style={{ margin: 10, alignItems: "center" }}>
          <Text style={{ marginVertical: 10 }}>
            {anotherAmt.toLocaleString()}만원
          </Text>
          <View
            style={{
              width: 80,
              height: peerBarHeight,
              backgroundColor: "#D9D9D9",
              marginTop: 160 - peerBarHeight,
              borderRadius: 20,
            }}
          />
          <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
            또래 평균
          </Text>
        </View>
        <View style={{ margin: 10, alignItems: "center" }}>
          <Text style={{ marginVertical: 10 }}>
            {userAmt.toLocaleString()}만원
          </Text>
          <View style={{ width: 80, height: 160 }}>
            <View
              style={{
                width: 80,
                height: myBarHeight,
                backgroundColor: "#729EFF",
                marginTop: 160 - myBarHeight,
                borderRadius: 20,
              }}
            />
          </View>
          <Text style={{ marginVertical: 10, fontWeight: "bold" }}>
            나의 소비
          </Text>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={{ marginStart: 12, marginBottom: 5 }}>또래 평균 대비</Text>
        {maxDifferenceIndex !== -1 && (
          <Text
            style={{
              marginStart: 12,
              marginBottom: 5,
              fontSize: 16,
              fontWeight: "bold",
            }}
          >
            <Text style={{ color: "#0050FF", fontSize: 20 }}>
              {data[maxDifferenceIndex]?.categoryName}
            </Text>
            에 지출이 많은 편이에요.
          </Text>
        )}

        {data.map((item, index) => (
          <View
            key={index}
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              marginHorizontal: 20,
              marginVertical: 10,
            }}
          >
            <Image
              source={CATEGORY[item.categoryId-1].path}
              style={{ width: 50, height: 50 }}
            />
            <Text style={{ fontWeight: "bold", flex: 1, marginHorizontal: 20 }}>
              {item.categoryName}
            </Text>
            <View style={{ alignItems: "flex-end" }}>
              <Text
                style={{ fontSize: 16, textAlign: "center" }}
              >{`${item.userPay.toLocaleString()}원`}</Text>
              <Text
                style={{
                  textAlign: "center",
                  fontSize: 12,
                  color:
                    item.userPay > item.comparePay
                      ? "red"
                      : item.userPay < item.comparePay
                      ? "green"
                      : "#729EFF",
                }}
              >
                {item.userPay === item.comparePay
                  ? "평균과 유사"
                  : `${Math.abs(
                      item.userPay - item.comparePay
                    ).toLocaleString()}원 ${
                      item.userPay > item.comparePay ? "더 사용" : "덜 사용"
                    }`}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 60,
  },
  backcontainer: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
  },
  title: {
    fontWeight: "bold",
    fontSize: 24,
    marginStart: 20,
  },
  midcontainer: {
    flexDirection: "row",
    margin: 20,
  },
  tag: {
    marginHorizontal: 12,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    fontWeight: "bold",
  },
  title2: {
    fontWeight: "bold",
    fontSize: 19,
    marginStart: 30,
  },
  box: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: "#D7D7D7",
    borderRadius: 20,
    padding: 12,
    paddingTop: 20,
    backgroundColor: "#ffffff",
  },
  // 필요에 따라 추가 스타일을 여기에 정의할 수 있습니다.
});

export default Compare;
