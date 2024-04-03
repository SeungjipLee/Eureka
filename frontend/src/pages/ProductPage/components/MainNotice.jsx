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

  const getImageStyle = (cardInfo) => {
    if (!cardInfo) return styles.image; // cardInfo가 없는 경우 기본 이미지 스타일

    switch (cardInfo.imgAttr) {
      case 0: // 가로 이미지
        return { ...styles.image, width: 100, height: 70 }; // 가로 이미지에 맞는 크기 조정
      case 1: // 세로 이미지
        return { ...styles.image, width: 70, height: 100 }; // 세로 이미지에 맞는 크기 조정
      default:
        return styles.image;
    }
  };

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

        <Pressable onPress={handleClickMyCard}>
          <Image
            source={
              checkChangeSelectPayCard && checkChangeSelectPayCard.imagePath
                ? { uri: checkChangeSelectPayCard.imagePath }
                : require("../../../../assets/ThinkingFace.png") // 대체 이미지 경로
            }
            style={getImageStyle(checkChangeSelectPayCard)}
          />
        </Pressable>
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
    marginRight: 100,
    marginLeft: 50,
  },
  maintextContainer: {
    flexDirection: "column",
    marginRight: 140,
    marginTop: 15,
  },
  maintext: {
    fontSize: 18,
    fontWeight: "400",
  },
  underlineText: {
    fontSize: 22,
    fontWeight: "500",
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
    marginLeft: 50,
    marginRight: 11,
  },
});
