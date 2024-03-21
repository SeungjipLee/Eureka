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

function BenefitCategoryList() {
  const categories = Array.from({ length: 5 });

  return (
    <View style={styles.container}>
      {categories.map((_, index) => (
        <View key={index} style={styles.categoryContainer}>
          <View style={styles.imageContainer}></View>
          <View style={styles.contentContainer}>
            <Text style={styles.categoryName}>음식점</Text>
            <Text style={styles.categoryPercent}>50%</Text>
            <Text style={styles.categorybenefit}>90,000원</Text>
          </View>
        </View>
      ))}
    </View>
  );
}

export default BenefitCategoryList;

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
    borderRadius: 45 / 2,
    backgroundColor: "#368bfa",
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
  categorybenefit: {
    fontSize: 16,
    fontWeight: "semibold",
    color: "black",
  },
});
