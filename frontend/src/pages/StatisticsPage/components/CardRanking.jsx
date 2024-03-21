import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";
import CardRakingList from "./CardRankingComponents/CardRakingList";

const SCREEN_WIDTH = Dimensions.get("window").width;

function CardRanking() {
  return (
    <View style={styles.container}>
      <Text style={styles.rankingText}>이번달에 혜택을 가장</Text>
      <Text style={styles.rankingText}>많이 받은 카드에요! </Text>
      <View style={styles.cardList}>
        <CardRakingList />
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
  rankingText: {
    fontSize: 20,
    fontWeight: "400",
    color: "black",
  },
  cardList: {
    flex: 2,
    marginTop: 50,
    maxHeight: 450,
    minWidth: 300,
  },
});
