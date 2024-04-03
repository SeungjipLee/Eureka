import React, { useState, useEffect } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { getMyCardList } from "../../apis/CardAPi";
import TokenUtils from "../../stores/TokenUtils";


function BankListModal({ visible, onClose, onSelect }) {
  const navigation = useNavigation();
  const [token, setToken] = useState("");

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  const banks = [
    {
      id: 1,
      name: "KB국민카드",
      imgUrl: require("../../../assets/banking_logo/kb.png"),
    },
    {
      id: 2,
      name: "삼성카드",
      imgUrl: require("../../../assets/banking_logo/samsung.png"),
    },
    {
      id: 3,
      name: "NH농협카드",
      imgUrl: require("../../../assets/banking_logo/nonghyup.png"),
    },
    {
      id: 4,
      name: "신한카드",
      imgUrl: require("../../../assets/banking_logo/shinhan.png"),
    },
    {
      id: 5,
      name: "현대카드",
      imgUrl: require("../../../assets/banking_logo/hyundai.png"),
    },
    {
      id: 6,
      name: "하나카드",
      imgUrl: require("../../../assets/banking_logo/hana.png"),
    },
    {
      id: 7,
      name: "우리카드",
      imgUrl: require("../../../assets/banking_logo/woori.png"),
    },
    {
      id: 8,
      name: "IBK기업은행카드",
      imgUrl: require("../../../assets/banking_logo/ibk.png"),
    },
    {
      id: 9,
      name: "롯데카드",
      imgUrl: require("../../../assets/banking_logo/lotte.png"),
    },
  ];

  const [selectedBanks, setSelectedBanks] = useState([]);
  const handleSelect = (bank) => {
    if (selectedBanks.find((selectedBank) => selectedBank.id === bank.id)) {
      setSelectedBanks(
        selectedBanks.filter((selectedBank) => selectedBank.id !== bank.id)
      );
    } else {
      setSelectedBanks([...selectedBanks, bank]);
    }
  };

  const handleSubmit = async () => {
    const bankIds = selectedBanks.map((bank) => bank.id);
    const inputData = {
      cardCompayList: bankIds,
    };

    getMyCardList(
      token,
      inputData,
      (res) => {
        const cardListWithImages = res.data.cardList.map((card) => {
          const bank = banks.find((bank) => bank.name === card.bankName);
          const imgUrl = bank ? bank.imgUrl : undefined;
          return { ...card, imgUrl };
        });
        console.log(cardListWithImages)
        navigation.navigate("PaymentPassword", {
          frompage: "BankListModal",
          responseData: cardListWithImages,
        });
      },
      (err) => console.log(err)
    );
  };

  return (
    <Modal
      style={styles.container}
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <FlatList
              data={banks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => {
                const isSelected = selectedBanks.some(
                  (bank) => bank.id === item.id
                );
                return (
                  <TouchableOpacity
                    style={[
                      styles.bankItem,
                      isSelected && styles.selectedBankItem,
                    ]}
                    onPress={() => handleSelect(item)}
                  >
                    <Image
                      source={item.imgUrl}
                      style={{ width: 40, height: 40 }}
                    />
                    <Text
                      style={[
                        styles.bankText,
                        isSelected && styles.selectedBankText,
                      ]}
                    >
                      {item.name}
                    </Text>
                    <MaterialCommunityIcons
                      name="check"
                      size={24}
                      color={isSelected ? "#6396FE" : "#C5C5C5"}
                    />
                  </TouchableOpacity>
                );
              }}
            />
            <View style={{ flexDirection: "row" }}>
              <View style={styles.box1}>
                <Text style={styles.txt1}>닫기</Text>
              </View>
              <TouchableOpacity onPress={handleSubmit}>
                <View style={styles.box2}>
                  <Text style={styles.txt2}>계속하기</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

export default BankListModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalView: {
    width: "100%",
    height: "70%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  bankItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    alignItems: "center",
    height: 50,
    padding: 10,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
  },
  selectedBankItem: {
    backgroundColor: "#E5EEFF", // 선택된 아이템의 배경색을 파란색으로 설정
  },
  selectedBankText: {},
  bankText: {
    fontSize: 18,
    marginLeft: 40,
    flexGrow: 1,
    fontWeight: "700",
    textAlign: "left",
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 18,
    textAlign: "center",
  },
  closeButton: {
    backgroundColor: "#2196F3",
  },
  benefitText: {
    marginVertical: 2,
  },
  box1: {
    marginTop: 20,
    width: 120,
    height: 60,
    backgroundColor: "#D9D9D9",
    marginHorizontal: 20,
    borderRadius: 20,
  },
  box2: {
    marginTop: 20,
    width: 180,
    height: 60,
    backgroundColor: "#5187FF",
    borderRadius: 20,
  },
  txt1: {
    textAlign: "center",
    marginVertical: 16,
    color: "white",
    fontSize: 20,
  },
  txt2: {
    textAlign: "center",
    marginVertical: 16,
    color: "white",
    fontSize: 20,
  },
});
