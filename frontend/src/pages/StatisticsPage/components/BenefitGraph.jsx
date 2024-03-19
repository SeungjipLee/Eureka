import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import BenefitCategoryList from "./BenefitGraphComponents/BenefitCategoryList";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BenefitAmount = 1300000;

function BenefitGraph() {
  const formatCounsumptionAmount = BenefitAmount.toLocaleString();

  return (
    <View style={styles.container}>
      <View style={styles.monthInfo}>
        <Text style={styles.monthText}>3월</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.topContainer}>
        <Text style={styles.BenefitText}>
          <Text style={{ fontWeight: "bold" }}>3</Text>월달에는{" "}
          <Text style={{ fontWeight: "bold" }}>음식점에서</Text>
        </Text>
        <View style={styles.amountContainer}>
          <Text style={styles.BenefitText}>가장 많은 혜택을 누렸어요!</Text>
        </View>
        <View style={styles.rowGraph}></View>
        {/* 카테고리페이지에서 만들기 */}
      </View>
      <View style={styles.bottomContainer}>
        <BenefitCategoryList />
      </View>
    </View>
  );
}

export default BenefitGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: SCREEN_WIDTH - 80,
    justifyContent: "center",
    alignItems: "center",
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
  monthInfo: {
    marginBottom: 25,
    marginTop: 30,
  },
  monthText: {
    fontSize: 22,
    fontWeight: "400",
  },
  BenefitText: {
    fontSize: 15,
    fontWeight: "100",
    color: "black",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 60,
  },
  topContainer: {
    flex: 1,
  },
  rowGraph: {
    // 임시 그래프
    marginTop: 20,
    height: 40,
    width: 300,
    backgroundColor: "#2090ff",
    borderRadius: 20,
  },
  bottomContainer: {
    flex: 3,
  },
  line: {
    height: 0.7,
    width: 300,
    backgroundColor: "gray",
    marginBottom: 10,
  },
});
