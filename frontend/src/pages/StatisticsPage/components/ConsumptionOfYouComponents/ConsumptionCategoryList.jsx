import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
  Image,
} from "react-native";

const { width, height } = Dimensions.get("window");

function ConsumptionCategoryList() {
  const categories = Array.from({ length: 5 });

  return (
    <View style={styles.container}>
      {categories.map((_, index) => (
        <View key={index} style={styles.categoryContainer}>
          <View style={styles.imageContainer}>
            <Image
              source={require("../../../../../assets/burger.png")}
              style={styles.image}
            />
          </View>
          <View style={styles.contentContainer}>
            <Text style={styles.categoryName}>음식점</Text>
            <Text style={styles.categoryPercent}>50%</Text>
            <Text style={styles.categoryConsumption}>900,000원</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default ConsumptionCategoryList;

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  categoryContainer: {
    flexDirection: "row",
    marginTop: 15,
    marginBottom: 10,
    alignItems: "center",
  },
  imageContainer: {
    height: 45,
    width: 45,
    borderRadius: 45 / 2, // height와 width의 절반 값을 설정하여 원형 모양을 만듦
    backgroundColor: "#ffdab0",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 20,
  },
  image: {
    height: 35,
    width: 35,
  },
  contentContainer: {
    marginLeft: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  categoryName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "black",
    marginRight: 30,
  },
  categoryPercent: {
    color: "grey",
    fontSize: 12,
    marginRight: 30,
    marginTop: 5,
  },
  categoryConsumption: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "black",
  },
});
