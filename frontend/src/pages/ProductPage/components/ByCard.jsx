import React from "react";
import { StyleSheet, View } from "react-native";
import ChooseOne from "./ByCardComponent/ChooseOne";
import CardList from "./ByCardComponent/CardList";

function ByCard() {
  return (
    <View style={styles.container}>
      <View style={styles.chooseOne}>
        <ChooseOne />
      </View>
      <View style={styles.cardList}>
        <CardList />
      </View>
    </View>
  );
}

export default ByCard;

const styles = StyleSheet.create({
  container: {},
  nextBtn: {
    start: "end",
    color: "#cacaca",
    marginTop: 50,
    marginLeft: 5,
  },
  chooseOne: {},
  cardList: { marginBottom: 50 },
});
