import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Pressable,
  StatusBar,
  ScrollView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function FitYourConsumption() {
  const navigation = useNavigation();
  return (
    <ScrollView contentContainerStyle={styles.container}>
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
          <Text style={styles.notice}>내 카드 대신</Text>
          <Text style={styles.notice}>추천카드를 썼다면?</Text>
          <Text style={styles.subText}>결제카드의 상위 3개의</Text>
          <Text style={styles.subText}>카테고리를 분석했어요</Text>
        </View>

        <Image
          source={require("../../../../assets/card2.png")}
          style={styles.image}
        />
      </View>

      <View style={styles.mainContent}></View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 50,
  },
  nextBtn: {
    color: "#b0b0b0",
    marginLeft: 15,
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
  image: {
    height: 80,
    width: 50,
    marginRight: 15,
    marginLeft: 80,
    marginTop: 20,
  },
  mainContent: {},
  titleConatiner: {},
});

export default FitYourConsumption;
