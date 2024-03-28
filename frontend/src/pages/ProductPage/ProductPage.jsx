import React, { useRef, useState, useEffect } from "react";
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

const screenHeight = Dimensions.get("window").height;

function ProductPage() {
  const clickMyCardValue = useSelector(
    (state) => state.productList.selectCardValue
  );
  const [cards, setCards] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState("");
  const [hasError, setHasError] = useState(false);
  const [selectedCardIndex, setSelectedCardIndex] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    setModalVisible(clickMyCardValue);
  }, [clickMyCardValue]);

  useEffect(() => {
    if (token) {
      getMyPaymentCards(
        token,
        (res) => {
          setCards(res.data);
          dispatch(saveMyPayCard(res.data));
          console.log(res.data, "결제카드 불러오기 성공");
          if (res.data.length === 0) {
            setHasError(true);
          } else {
            setHasError(false);
          }
        },
        (err) => {
          console.log("Error, ProductPage1", err);
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
      dispatch(selectPayCard(null)); // 선택을 취소하는 경우, null을 저장
    } else {
      setSelectedCardIndex(index);
      dispatch(selectPayCard(card)); // 선택된 카드의 ID를 Redux 스토어에 저장
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
                <Text style={{ marginLeft: 50 }}>{card.cardName}</Text>
                <Text
                  style={{
                    color: selectedCardIndex === index ? "blue" : "grey",
                    marginLeft: 100,
                  }}
                >
                  ✓
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setModalVisible(false);
              setSelectedCardIndex(null);
              dispatch(clickMyCard());
            }}
          >
            <Text>확인</Text>
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
    backgroundColor: "#fff",
    borderRadius: 10,
    marginVertical: 8,
    padding: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  closeButton: {},
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
