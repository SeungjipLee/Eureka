import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Dimensions,
  Image,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { clickMyCard } from "../../../slices/productSlice";
const { height } = Dimensions.get("window");

function MainNotice() {
  const dispatch = useDispatch();
  const checkChangeSelectPayCard = useSelector(
    (state) => state.productList.selectPayCardInfo
  );
  const handleClickMyCard = () => {
    dispatch(clickMyCard());
  };

  console.log(checkChangeSelectPayCard, "Look at this");
  return (
    <View style={styles.centeredView}>
      <View style={styles.container}>
        <View style={styles.maintextContainer}>
          <Text style={styles.maintext}>
            <Pressable onPress={handleClickMyCard}>
              <Text style={styles.underlineText}>내 카드</Text>
            </Pressable>
            를
          </Text>
          <Text style={styles.maintext}>분석했어요!</Text>
        </View>

        <Image
          source={
            checkChangeSelectPayCard && checkChangeSelectPayCard.imagePath
              ? { uri: checkChangeSelectPayCard.imagePath }
              : require("../../../../assets/ThinkingFace.png") // 대체 이미지 경로
          }
          style={styles.image}
        />
      </View>
    </View>
  );
}

export default MainNotice;

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
    width: 50,
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
  image: {
    width: 85,
    height: 55,
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 12,
  },
  image2: {
    width: 60,
    height: 85,
    resizeMode: "contain",
    marginLeft: 10,
    marginRight: 11,
  },
});
