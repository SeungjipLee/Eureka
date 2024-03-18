import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const BenefitGraphAmount = 13000000;

function BenefitGraph() {
  return (
    <View>
      <View style={styles.container}>
        <Text>내 소비</Text>
        <Text style={styles.BenefitGraphText}>3월 달에는 </Text>
        <Text style={styles.amountText}>{BenefitGraphAmount} 썼어요!</Text>
      </View>
    </View>
  );
}

export default BenefitGraph;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: SCREEN_WIDTH - 70,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20, // 둥근 모서리 효과 추가
    ...Platform.select({
      // 플랫폼 별 음영 효과 추가
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
  BenefitGraphText: {
    fontSize: 30,
    fontWeight: "200",
    color: "black",
  },
  amountText: {
    fontSize: 30,
    fontWeight: "200",
    color: "black",
  },
});
