import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

function CardRanking() {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.RankingText}>
          이번달에 혜택을 제일 많이 받은 카드에요!{" "}
        </Text>
      </View>
    </View>
  );
}

export default CardRanking;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: SCREEN_WIDTH - 70,
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
  consumptionText: {
    fontSize: 30,
    fontWeight: "200",
    color: "black",
  },
  RankingText: {
    fontSize: 30,
    fontWeight: "200",
    color: "black",
  },
});
