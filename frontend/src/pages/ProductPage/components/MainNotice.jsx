import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
} from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;

function MainNotice() {
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.maintext}>내 카드를 바꾸면</Text>
        <Text style={styles.maintext}>연 3만원을 아껴요</Text>
      </View>
    </View>
  );
}

export default MainNotice;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  maintext: {
    fontSize: 20,
    fontWeight: "400",
  },
});
