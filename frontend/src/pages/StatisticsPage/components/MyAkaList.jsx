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
import { useSelector } from "react-redux";

const akaData = [
  {
    tagName: "편의점지기",
    image: require("../../../../assets/HomerSimpson.png"),
    color: "#ff886d",
  },
  {
    tagName: "배달고수",
    image: require("../../../../assets/MonkeyDLuffy.png"),
    color: "#6cfe87",
  },
  {
    tagName: "푸드파이터",
    image: require("../../../../assets/foodfighter.png"),
    color: "#FFFCBA",
  },
  {
    tagName: "쇼핑홀릭",
    image: require("../../../../assets/PrincessBubblegum.png"),
    color: "#5ab6fc",
  },
];

function MyAkaList() {
  const navigation = useNavigation();
  // Using useSelector if needed here to fetch userInfo or other redux state

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Pressable onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={40}
            color="#cacaca"
          />
        </Pressable>
        <View style={styles.noticeContainer}>
          <Text style={styles.noticeText}>당신이 지금까지</Text>
          <Text style={styles.noticeText}>모은 칭호는 {akaData.length}개</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        {akaData.map((aka, index) => (
          <View
            key={index}
            style={[styles.akaCard, { backgroundColor: aka.color }]}
          >
            <Image source={aka.image} style={styles.image} />
            <View style={styles.contentContainer}>
              <Text style={{ fontSize: 25, fontWeight: "bold" }}>
                {aka.tagName}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topContainer: {
    flex: 1,
    alignItems: "flex-start",
    marginTop: 60,
    marginLeft: 10,
  },
  midContainer: {
    flex: 1,
  },
  bottomContainer: {
    flex: 3,
    alignItems: "center",
    marginLeft: -20,
  },
  nextBtn: {
    color: "#cacaca",
  },
  noticeContainer: {
    marginTop: 25,
    alignItems: "center",
    marginLeft: 20,
  },
  noticeText: {
    fontSize: 25,
    fontWeight: "600",
  },
  akaCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 15,
    width: 350,
    height: 90,
    borderRadius: 20,
    paddingHorizontal: 20, // Added padding
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
    flex: 1, // Ensure content container fills the rest of the card
  },
});

export default MyAkaList;
