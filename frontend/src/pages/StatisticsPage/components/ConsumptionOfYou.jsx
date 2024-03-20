import React from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import ConsumptionCategoryList from "./ConsumptionOfYouComponents/consumptionCategoryList";

const SCREEN_WIDTH = Dimensions.get("window").width;
const consumptionAmount = 1300000;

function ConsumptionOfYou() {
  const formatCounsumptionAmount = consumptionAmount.toLocaleString();

  return (
    <View style={styles.container}>
      <View style={styles.myConsumptionContainer}>
        <Text style={styles.myConsumptionText}>내 소비</Text>
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.consumptionText}>
          <Text style={{ fontWeight: "bold" }}>3</Text>월달에는
        </Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{formatCounsumptionAmount}</Text>
          <Text style={styles.consumptionText}>원 썼어요!</Text>
        </View>
        <View style={styles.rowGraph}></View>
        {/* 카테고리페이지에서 만들기 */}
      </View>
      <View style={styles.bottomContainer}>
        <ConsumptionCategoryList />
      </View>
    </View>
  );
}

export default ConsumptionOfYou;

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
  myConsumptionContainer: {
    marginBottom: 35,
    marginTop: 20,
  },
  myConsumptionText: {
    fontSize: 22,
    fontWeight: "400",
  },
  consumptionText: {
    fontSize: 20,
    fontWeight: "100",
    color: "black",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 60,
  },
  amountText: {
    fontSize: 30,
    fontWeight: "400",
    color: "#4D85FF",
    marginRight: 5,
  },
  topContainer: {
    flex: 1,
  },
  rowGraph: {
    // 임시 그래프
    marginTop: 20,
    height: 40,
    width: 300,
    backgroundColor: "#E76F51",
    borderRadius: 20,
  },
  bottomContainer: {
    flex: 3,
  },
});
