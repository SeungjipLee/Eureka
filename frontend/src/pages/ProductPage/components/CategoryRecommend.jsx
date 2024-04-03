import { StyleSheet, ScrollView, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function CategoryRecommend() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.noticeTextContainer}>
        <Text style={styles.noticeText}>다른 카드들이 궁금하다면?</Text>
      </View>
      <Pressable
        style={styles.byCard}
        onPress={() => navigation.navigate("ByCard")}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.byCardText}>카드사별로 찾아보기</Text>
          <Pressable onPress={() => navigation.navigate("ByCard")}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              style={styles.nextBtn}
            />
          </Pressable>
        </View>
      </Pressable>

      <Pressable
        style={styles.byCatergory}
        onPress={() => navigation.navigate("ByCategory")}
      >
        <View style={styles.innerContainer}>
          <Text style={styles.byCardText}>카테고리별로 찾아보기</Text>
          <Pressable onPress={() => navigation.navigate("ByCategory")}>
            <MaterialCommunityIcons
              name="chevron-right"
              size={26}
              style={styles.nextBtn}
            />
          </Pressable>
        </View>
      </Pressable>
    </View>
  );
}

export default CategoryRecommend;

const styles = StyleSheet.create({
  container: {},
  noticeTextContainer: {},
  noticeText: {
    fontSize: 20,
    fontWeight: "600",
  },
  byCard: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    width: 370,
    backgroundColor: "#d9d9d9",
    borderRadius: 7,
    marginTop: 10,
    marginBottom: 10,
  },
  byCatergory: {
    flexDirection: "row",
    alignItems: "center",
    height: 60,
    width: 370,
    backgroundColor: "#d9d9d9",
    borderRadius: 7,
    marginBottom: 10,
  },
  innerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "90%",
    marginLeft: 20,
  },
  byCardText: {
    fontSize: 15,
    fontWeight: "semibold",
  },
  nextBtn: {},
});
