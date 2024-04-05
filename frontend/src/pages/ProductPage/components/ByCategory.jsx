import React from "react";
import { StyleSheet, View, Text, Pressable } from "react-native";
import CategoryCardList from "./ByCategoryComponent/CategoryCardList";
import CategoryChooseOne from "./ByCategoryComponent/CategoryChooseOne";
function ByCategory() {
  return (
    <View style={styles.container}>
      <View style={styles.chooseOne}>
        <CategoryChooseOne />
      </View>
      <View style={styles.cardList}>
        <CategoryCardList />
      </View>
    </View>
  );
}

export default ByCategory;

const styles = StyleSheet.create({
  container: {},
  nextBtn: {
    start: "end",
    color: "#cacaca",
    marginTop: 50,
    marginLeft: 5,
  },
  chooseOne: {},
  cardList: {
    marginBottom: 50,
  },
});
