import React, { useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Pressable,
  Dimensions,
  Image,
} from "react-native";

const { height } = Dimensions.get("window");

function MainNotice() {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>모달 창 내용</Text>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>닫기</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      <View style={styles.container}>
        <View style={styles.maintextContainer}>
          <Text style={styles.maintext}>
            <Pressable onPress={() => setModalVisible(true)}>
              <Text style={styles.underlineText}>내 카드</Text>
            </Pressable>
            를
          </Text>
          <Text style={styles.maintext}>분석했어요!</Text>
        </View>

        <Image
          source={require("../../../../assets/card2.png")}
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
});
