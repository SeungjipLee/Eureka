import React from "react";
import {
  StyleSheet,
  View,
  Text,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = (SCREEN_WIDTH - 80) / 2;

function IfUseRecommendCard() {
  return (
    <View style={styles.container}>
      <View style={styles.maintextContainer}>
        <Text style={styles.maintext}>
          김싸피님! <Text style={styles.maintext}>이번달에는</Text>
        </Text>
        <Text style={{ fontSize: 18, fontWeight: "600" }}>
          대중교통<Text style={styles.maintext}>에서 많이 사용하셨네요!</Text>
        </Text>
      </View>

      <View style={styles.carouselContainer}>
        <TouchableOpacity style={styles.arrowButton}>
          <MaterialCommunityIcons name="chevron-left" size={24} color="black" />
        </TouchableOpacity>

        <ScrollView
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          style={styles.midContainer}
        >
          <View style={styles.card}>
            <Text style={styles.cardText}>카드 1</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>카드 2</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.cardText}>카드 3</Text>
          </View>
        </ScrollView>

        <TouchableOpacity style={styles.arrowButton}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.subTextContainer}>
        <Text style={styles.subText}>추천카드를 사용하면</Text>
        <Text style={styles.subText}>3,300원 더 할인받아요!</Text>
        <Text>kb국민 아자아자 파이팅 카드</Text>
      </View>
    </View>
  );
}

export default IfUseRecommendCard;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maintext: {
    fontSize: 17,
    fontWeight: "400",
  },
  maintextContainer: {
    justifyContent: "center",
    alignItems: "center",
  },
  carouselContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  midContainer: {
    flex: 1,
  },
  card: {
    width: CARD_WIDTH,
    marginHorizontal: 20,
    backgroundColor: "#f0f0f0",
    borderRadius: 10,
    height: 200,
    justifyContent: "center",
    alignItems: "center",
  },
  cardText: {
    fontSize: 20,
    fontWeight: "bold",
  },
  arrowButton: {
    padding: 10,
  },
  subTextContainer: {
    marginTop: 20,
    marginBottom: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  subText: {
    fontSize: 16,
    fontWeight: "600",
  },
});
