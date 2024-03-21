import React from "react";
import { StyleSheet, ScrollView, View, Text, Pressable } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import ChooseOne from "./ByCardComponent/ChooseOne";

function ByCard() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.chooseOne}>
        <ChooseOne />
      </View>
      <View style={styles.cardList}></View>
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
  cardList: {},
});
