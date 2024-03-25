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
        <View style={styles.rightContainer}>
          <Text style={styles.benefitAmount}>
            {CurrentBenfitAmount.toLocaleString()}원
          </Text>
          <Pressable onPress={() => navigation.navigate("CurrentBenefitMore")}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              style={styles.nextBtn}
            />
          </Pressable>
        </View>
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
    width: SCREEN_WIDTH - 30,
    borderRadius: 10,
  },
  maintext: {
    fontSize: 15,
    fontWeight: "200",
  },
  rightContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  benefitAmount: {
    fontSize: 15,
    marginRight: 10,
  },
  nextBtn: {},
});
