import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function TwoCategory() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.category1}>
        <Image
          source={require("../../../../assets/favicon.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 13, fontWeight: "600" }}>
            김싸피님 소비에 딱 맞는 카드
          </Text>
          <Text>대중교통, 소비, 음식점</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("FitYourConsumption")}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            style={styles.nextBtn}
          />
        </Pressable>
      </View>

      <View style={styles.category2}>
        <Image
          source={require("../../../../assets/favicon.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 13, fontWeight: "600" }}>
            20대들이 환장하는 카드
          </Text>
          <Text>디자인, 인기, 캐릭터</Text>
        </View>
        <Pressable onPress={() => navigation.navigate("ByCard")}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            style={styles.nextBtn}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  category1: {
    flexDirection: "row",
    width: 400,
    height: 50,
    marginTop: 10,
  },
  category2: {
    flexDirection: "row",
    width: 400,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
  },
  textContainer: {
    width: 180,
    marginLeft: 25,
    marginRight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginLeft: 25,
    marginRight: 40,
  },
  nextBtn: {
    marginTop: 15,
  },
});
export default TwoCategory;
