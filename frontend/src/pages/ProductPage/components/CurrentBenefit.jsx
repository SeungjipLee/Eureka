import { StyleSheet, View, Text, Dimensions, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CurrentBenfitAmount = 6800;
const SCREEN_WIDTH = Dimensions.get("window").width;

function CurrentBenefit() {
  const navigation = useNavigation();
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.maintext}>현재카드 혜택</Text>
        <Text style={styles.benefitAmount}>
          {CurrentBenfitAmount.toLocaleString()}원
        </Text>
        <Pressable onPress={() => navigation.navigate("ByCard")}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            style={styles.nextBtn}
          />
        </Pressable>
      </View>
    </View>
  );
}

export default CurrentBenefit;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#e4e4e4",
    width: SCREEN_WIDTH - 20,
    borderRadius: 10,
  },
  maintext: {
    fontSize: 15,
    fontWeight: "200",
  },
  benefitAmount: {
    fontSize: 15,
  },
  nextBtn: {},
});
