import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
const { height } = Dimensions.get("window");

function NopaymentCardErr() {
  const navigation = useNavigation();

  return (
    <View style={styles.centeredView}>
      <View style={styles.container}>
        <View style={styles.maintextContainer}>
          <Text style={styles.maintext}>
            <Pressable onPress={() => navigation.navigate("CardHome")}>
              <Text style={styles.underlineText}>내 카드</Text>
            </Pressable>
            를
          </Text>
          <Text style={styles.maintext}>등록해주세요!</Text>
        </View>

        <Image
          source={require("../../../../assets/ThinkingFace.png")}
          style={styles.image}
        />
      </View>
    </View>
  );
}

export default NopaymentCardErr;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalView: {
    height: height / 2,
    backgroundColor: "white",
    borderTopRightRadius: 20,
    borderTopLeftRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
  },
  container: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 10,
    marginLeft: 100,
  },
  maintextContainer: {
    flexDirection: "column",
    marginRight: 40,
    marginTop: 15,
  },
  maintext: {
    fontSize: 17,
    fontWeight: "400",
  },
  underlineText: {
    fontSize: 20,
    fontWeight: "400",
    textDecorationLine: "underline",
  },
});
