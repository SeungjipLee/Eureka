import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const benefitAmount = 1930000;

function BenefitAmountOfYou() {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.benefitText}>이번달 혜택 금액은</Text>
        <Text>
          {benefitAmount} <Text>원</Text>
        </Text>
        <Text style={styles.amountText}>이에요!</Text>
      </View>
    </View>
  );
}

export default BenefitAmountOfYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D85FF",
    width: SCREEN_WIDTH - 40,
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
  benefitText: {
    fontSize: 30,
    fontWeight: "200",
    color: "white",
  },
  amountText: {
    fontSize: 30,
    fontWeight: "200",
    color: "white",
  },
});
