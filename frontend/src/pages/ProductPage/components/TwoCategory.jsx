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
          source={require("../../../../assets/goodIcon.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 13, fontWeight: "600" }}>
            김싸피님 소비에 딱 맞는 카드
          </Text>
          <Text>대중교통, 소비, 음식점</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("FitYourConsumption")}
          style={styles.pressableStyle}
        >
          <MaterialCommunityIcons name="chevron-right" size={26} />
        </Pressable>
      </View>

      <View style={styles.category2}>
        <Image
          source={require("../../../../assets/SlightlySmilingFace.png")}
          style={styles.image}
        />
        <View style={styles.textContainer}>
          <Text style={{ fontSize: 13, fontWeight: "600", marginRight: 15 }}>
            20대들이 좋아하는 카드
          </Text>
          <Text style={{ marginRight: 15 }}>디자인, 인기, 캐릭터</Text>
        </View>
        <Pressable
          onPress={() => navigation.navigate("FitYourConsumption")}
          style={styles.pressableStyle}
        >
          <MaterialCommunityIcons name="chevron-right" size={26} />
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
    alignItems: "center",
  },
  category2: {
    flexDirection: "row",
    width: 400,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
    alignItems: "center",
  },
  textContainer: {
    width: 180,
    marginLeft: 5,
    marginRight: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    marginLeft: 25,
    marginRight: 40,
  },
  pressableStyle: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 30,
  },
});
export default TwoCategory;
