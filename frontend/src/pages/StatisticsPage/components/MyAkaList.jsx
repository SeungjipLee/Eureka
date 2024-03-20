import React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Platform,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

function MyAkaList() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable onPress={() => navigation.navigate("StatisticsPage")}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={80}
            style={styles.nextBtn}
          />
        </Pressable>
      </View>

      <View style={styles.midContainer}>
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>옥세훈님이</Text>
          <Text style={styles.noticeText}>모은 칭호는 3개</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.akaCard}>
          <Image
            source={require("../../../../assets/foodfighter.png")}
            style={styles.image}
          ></Image>
          <View style={styles.contentContainer}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              FoodFighter
            </Text>
          </View>
        </View>

        <View style={styles.akaCard}>
          <Image
            source={require("../../../../assets/foodfighter.png")}
            style={styles.image}
          ></Image>
          <View style={styles.contentContainer}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              FoodFighter
            </Text>
          </View>
        </View>

        <View style={styles.akaCard}>
          <Image
            source={require("../../../../assets/foodfighter.png")}
            style={styles.image}
          ></Image>
          <View style={styles.contentContainer}>
            <Text style={{ fontSize: 25, fontWeight: "bold" }}>
              FoodFighter
            </Text>
          </View>
        </View>
      </View>
    </View>
  );
}

export default MyAkaList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
  },
  midContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 3,
    marginLeft: 20,
  },
  nextBtn: {
    start: "end",
    color: "#cacaca",
    marginTop: 80,
    marginLeft: 5,
  },
  noticeContainer: {
    marginTop: 25,
    marginLeft: 30,
  },
  noticeText: {
    fontSize: 35,
    fontWeight: "semibold",
  },
  akaCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 15,
    height: 90,
    width: 350,
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
  image: {
    height: 60,
    width: 80,
    marginRight: 20,
  },
  contentContainer: {
    marginRight: 10,
  },
});
