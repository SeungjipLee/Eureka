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
      <View style={styles.byCard}>
        <Text style={styles.byCardText}>카드사별로 찾아보기</Text>
        <Pressable onPress={() => navigation.navigate("ByCard")}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            style={styles.nextBtn}
          />
        </Pressable>
      </View>
      <View style={styles.byCatergory}>
        <Text style={styles.byCardText}>카테고리별로 찾아보기</Text>
        <Pressable onPress={() => navigation.navigate("ByCategory")}>
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

export default CategoryRecommend;

const styles = StyleSheet.create({
  container: {},
  noticeTextContainer: {},
  noticeText: {
    fontSize: 20,
    fontWeight: "600", // 'semibold' 대신 '600' 사용
  },
  byCard: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 380,
    backgroundColor: "#d9d9d9",
    marginTop: 10,
    marginBottom: 10,
  },
  byCatergory: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    height: 60,
    width: 380,
    backgroundColor: "#d9d9d9",
    marginBottom: 10,
  },
  byCardText: {
    fontSize: 15,
    fontWeight: "semibold",
  },
  nextBtn: {
    marginStart: "auto", // 'start: "end"' 대신 'marginStart: "auto"' 사용
  },
});
