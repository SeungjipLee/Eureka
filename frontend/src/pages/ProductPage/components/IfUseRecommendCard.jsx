import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

function IfUseRecommendCard() {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.maintext}>내 카드대신 추천카드를 썼다면?</Text>
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
    fontSize: 15,
    fontWeight: "200",
  },
});
