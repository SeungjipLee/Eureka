import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  ScrollView,
  View,
  StatusBar,
  Platform,
  Dimensions,
  Modal,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";
import MainNotice from "./components/MainNotice";
import CurrentBenefit from "./components/CurrentBenefit";
import IfUseRecommendCard from "./components/IfUseRecommendCard";
import CategoryRecommend from "./components/CategoryRecommend";
import TwoCategory from "./components/TwoCategory";
import NopaymentCardErr from "./components/NoPaymentCardErr";
import { useDispatch, useSelector } from "react-redux";
import {
  clickMyCard,
  saveMyPayCard,
  selectPayCard,
} from "../../slices/productSlice";
import TokenUtils from "../../stores/TokenUtils";
import { getMyPaymentCards } from "../../apis/ProductApi";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const screenHeight = Dimensions.get("window").height;

function ProductPage() {
  const clickMyCardValue = useSelector(
    (state) => state.productList.selectCardValue
  );
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState("");
  const [hasError, setHasError] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(0);
  const [tempSelectedCard, setTempSelectedCard] = useState(null); // 확인시 이미지가 바뀔수 있게 카드 정보를 임시로 저장하기위함

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getRefreshToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    setModalVisible(clickMyCardValue);
  }, [clickMyCardValue]);

  useEffect(() => {
    if (token) {
      // 현재 날짜를 얻기 위한 함수
      const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear(); // 현재 연도
        const month = date.getMonth() + 1; // JavaScript에서 월은 0부터 시작하므로 +1
        return year * 100 + month; // YYYYMM 형태로 반환
      };

      const currentDate = getCurrentDate();
      getMyPaymentCards(
        token,
        currentDate,
        (res) => {
          setCards(res.data);
          dispatch(saveMyPayCard(res.data));
          dispatch(selectPayCard(res.data[0])); // 선택된 결제카드 디폴트: 첫번째 결제카드
          console.log(res.data, "결제카드 불러오기 성공");
          if (res.data.length === 0) {
            setHasError(true);
          } else {
            setHasError(false);
          }
        },
        (err) => {
          console.log("Error, ProductPage 결제카드 불러오기", err);
          if (err.response && err.response.status === 404) {
            setHasError(true);
          }
        }
      );
    }
  }, [token]);

  const handleSelectCard = (card, index) => {
    if (selectedCardIndex === index) {
      setSelectedCardIndex(null);
      setTempSelectedCard(null); // 임시 선택된 카드 정보 삭제
    } else {
      setSelectedCardIndex(index);
      setTempSelectedCard(card); // 임시 선택된 카드 정보 저장
    }
  };

  console.log(clickMyCardValue, "ProductPage");
  return (
    <>
      <ScrollView contentContainerStyle={styles.container}>
        {modalVisible && <View style={styles.overlayStyle} />}
        <View style={styles.mainnotice}>
          {hasError ? <NopaymentCardErr /> : <MainNotice />}
        </View>
        <View style={styles.currentbenefit}>
          <CurrentBenefit />
        </View>
        <View style={styles.ifuserecommend}>
          <IfUseRecommendCard />
        </View>
        <View style={styles.twocategory}>
          <TwoCategory />
        </View>
        <View style={styles.categoryrecommend}>
          <CategoryRecommend />
        </View>
      </ScrollView>

      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View style={styles.modalView}>
          <ScrollView style={{ flex: 1 }}>
            {cards.map((card, index) => (
              <TouchableOpacity
                key={card.cardId}
                style={styles.cardItem}
                onPress={() => handleSelectCard(card, index)}
              >
                <Image
                  source={{ uri: card.imagePath }}
                  style={[
                    card.imageAttr === 0 ? styles.image : styles.image2,
                    {
                      transform:
                        card.imageAttr === 0 ? [{ rotate: "90deg" }] : [],
                    },
                  ]}
                />
                <Text
                  style={{ fontSize: 14, fontWeight: "600", marginRight: 30 }}
                >
                  {card.cardName}
                </Text>
                <MaterialCommunityIcons
                  name="check"
                  size={24}
                  color={selectedCardIndex === index ? "#6396FE" : "#C5C5C5"}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
              if (tempSelectedCard !== null) {
                dispatch(selectPayCard(tempSelectedCard)); // 임시로 선택된 카드 정보를 Redux 스토어에 저장
              }
              dispatch(clickMyCard());
              setTempSelectedCard(null); // 임시 상태 초기화
            }}
          >
            <Text style={{ fontSize: 20, fontWeight: "600", color: "#ffffff" }}>
              확인
            </Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
}

export default ProductPage;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
    backgroundColor: "#F7F7F7",
  },
  mainnotice: {
    flex: 2,
    marginTop: 50,
  },
  currentbenefit: {
    flex: 0.5,
    marginTop: 20,
    maxHeight: 50,
  },
  ifuserecommend: {
    flex: 2,
    minHeight: 300,
    marginTop: 30,
    marginBottom: 20,
  },
  categoryrecommend: {
    marginBottom: 20,
  },
  twocategory: {
    marginTop: 20,
    marginBottom: 20,
  },
  modalView: {
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
    bottom: 0,
    width: "100%",
    height: screenHeight / 1.6,
    backgroundColor: "white",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  overlayStyle: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
  },
  cardItem: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
    marginVertical: 8,
    padding: 10,
  },
  closeButton: {
    marginBottom: 20,
    alignItems: "center",
    justifyContent: "center",
    height: 50,
    width: 150,
    borderRadius: 15,
    backgroundColor: "#527dfd",
  },
  image: {
    width: 95,
    height: 60,
    resizeMode: "contain",
    marginBottom: 15,
    marginTop: 12,
  },
  image2: {
    width: 80,
    height: 100,
    resizeMode: "contain",
    marginLeft: 10,
    marginRight: 40,
  },
});
