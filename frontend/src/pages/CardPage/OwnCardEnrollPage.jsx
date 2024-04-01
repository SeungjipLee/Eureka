import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { addOwnCard } from "../../apis/CardAPi";
import TokenUtils from "../../stores/TokenUtils";

function OwnCardEnrollPage({ route }) {
  const navigation = useNavigation();
  const { responseData } = route.params || {};
  const [token, setToken] = useState("");
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

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  const [selectedCards, setSelectedCards] = useState([]);

  const toggleCardSelection = (cardCompanyId, cardId) => {
    const uniqueCardKey = `${cardCompanyId}-${cardId}`;
    if (selectedCards.includes(uniqueCardKey)) {
      setSelectedCards(selectedCards.filter((id) => id !== uniqueCardKey));
    } else {
      setSelectedCards([...selectedCards, uniqueCardKey]);
    }
  };

  const renderCardItem = ({ item, cardCompanyId }) => {
    const uniqueCardKey = `${cardCompanyId}-${item.cardId}`;
    const isSelected = selectedCards.includes(uniqueCardKey);
    // imgAttr 값에 따라 회전 스타일 적용
    const imageStyle =
      item.imgAttr === 1
        ? [
            {
              borderRadius: 10,
              width: 55,
              height: 80,
              marginLeft: 10,
              marginRight: 30,
              transform: [{ rotate: "270deg" }],
            },
          ]
        : { borderRadius: 10, width: 80, height: 55, marginRight: 10 };

    return (
      <TouchableOpacity
        style={styles.cardItem}
        onPress={() => toggleCardSelection(cardCompanyId, item.cardId)}
      >
        <Image source={{ uri: item.imagePath }} style={imageStyle} />
        <Text style={styles.cardName}>{item.cardName}</Text>
        <MaterialCommunityIcons
          name={isSelected ? "check" : "checkbox-blank-outline"}
          size={24}
          color={isSelected ? "#6396FE" : "#C5C5C5"}
          style={{ marginLeft: "auto" }}
        />
      </TouchableOpacity>
    );
  };

  function getSelectedCardDetails(selectedCards, responseData) {
    const selectedCardDetails = [];

    selectedCards.forEach((selectedCardKey) => {
      const [cardCompanyId, cardId] = selectedCardKey.split("-");

      const companyData = responseData.find(
        (company) => company.cardCompanyId.toString() === cardCompanyId
      );
      if (!companyData) return;

      const cardData = companyData.list.find(
        (card) => card.cardId.toString() === cardId
      );
      if (!cardData) return; // 해당 카드가 없으면 스킵

      selectedCardDetails.push({
        cardId: cardData.cardId,
        cardIdentifier: cardData.cardIdentifier,
      });
    });

    return selectedCardDetails;
  }

  const renderBankItem = ({ item }) => (
    <View style={styles.bankContainer}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{ width: 30, height: 30, marginHorizontal: 10 }}
          source={banks[item.cardCompanyId - 1].imgUrl}
        />
        <Text style={styles.bankName}>{item.companyName}</Text>
      </View>
      <View
        style={{ height: 1, backgroundColor: "#C5C5C5", marginVertical: 5 }}
      ></View>
      <FlatList
        data={item.list}
        renderItem={({ item: cardItem }) =>
          renderCardItem({ item: cardItem, cardCompanyId: item.cardCompanyId })
        }
        keyExtractor={(cardItem) => `${item.cardCompanyId}-${cardItem.cardId}`}
      />
    </View>
  );

  const handleSubmit = async () => {
    const cardDetails = getSelectedCardDetails(selectedCards, responseData);
    const inputData = {
      registerUserCard: cardDetails,
    };
    addOwnCard(
      token,
      inputData,
      (res) => {
        navigation.navigate("보유 카드");
      },
      (err) => console.log(err)
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons
            name="chevron-left"
            size={50}
            color="#B8B8B8"
          />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>보유 카드 불러오기</Text>
      </View>
      <FlatList
        style={styles.bankContainer}
        data={responseData}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={renderBankItem}
        keyExtractor={(item) => `${item.cardCompanyId}`}
      />
      <Text style={styles.selectionText}>
        <Text style={styles.selectionCount}>{selectedCards.length}</Text>개
        선택됨
      </Text>
      <TouchableOpacity style={styles.btn} onPress={handleSubmit}>
        <Text style={styles.btnText}>선택 완료</Text>
      </TouchableOpacity>
    </View>
  );
}

export default OwnCardEnrollPage;

const styles = StyleSheet.create({
  container: {
    height: 750,
    width: "90%",
    alignSelf: "center",
    marginTop: 20,
  },
  header: {
    marginStart: 20,
    marginTop: 40,
    flexDirection: "row",
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 10,
  },
  bankContainer: {
    backgroundColor: "#ffffff",
    marginVertical: 10,
    borderRadius: 20,
    padding: 10,
  },
  cardItem: {
    justifyContent: "space-around",
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 3,
    padding: 10,
  },
  cardImage: {
    width: 80,
    height: 55,
    marginRight: 10,
  },
  bankName: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  cardName: {
    fontSize: 16,
    flex: 1,
  },
  btn: {
    backgroundColor: "#5187FF",
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    margin: 20,
    borderRadius: 10,
  },
  btnText: {
    color: "white",
    fontSize: 20,
  },
  selectionText: {
    textAlign: "center",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 10,
    marginBottom: 20,
  },
  selectionCount: {
    color: "blue",
    fontSize: 24,
  },
});
