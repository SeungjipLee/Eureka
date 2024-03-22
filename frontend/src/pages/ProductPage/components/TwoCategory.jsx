import React from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  Pressable,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

function TwoCategory() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <View style={styles.category1}>
        <Image></Image>
        <View style={styles.textContainer}></View>
        <Pressable onPress={() => navigation.navigate("ByCard")}>
          <MaterialCommunityIcons
            name="chevron-right"
            size={26}
            style={styles.nextBtn}
          />
        </Pressable>
      </View>

      <View style={styles.category2}>
        <Image></Image>
        <View style={styles.textContainer}></View>
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

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
  },
  category1: {
    backgroundColor: "green",
    width: 400,
    height: 50,
    marginTop: 10,
  },
  category2: {
    backgroundColor: "green",
    width: 400,
    height: 50,
    marginTop: 10,
    marginBottom: 20,
  },
  textContainer: {},
});
export default TwoCategory;
