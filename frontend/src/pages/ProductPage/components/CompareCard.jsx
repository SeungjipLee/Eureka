import React, { useRef, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  StyleSheet,
  View,
  Text,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  Pressable,
  Linking,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import TokenUtils from "../../../stores/TokenUtils";
import { getCompareMycardAndRecommendCard } from "../../../apis/ProductApi";

const { width } = Dimensions.get("window");

function CompareCard() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [cards, setCards] = useState([]);
  const [categoryCard, setCategoryCard] = useState([]);
  const [ddoraeCard, setDdoraeCard] = useState([]);
  const [myCard, setMyCard] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const selectCard = useSelector(
    (state) => state.productList.selectPayCardInfo
  );
  const selectCardBenefit = useSelector(
    (state) => state.productList.payCardBenefit
  );
  const discountProfit = useSelector((state) => state.productList.profit);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  // 이미지 스타일을 동적으로 결정하는 함수
  function getImageStyle(imgAttr) {
    if (imgAttr === 0) {
      // 가로 이미지
      return styles.horizontalImage;
    } else if (imgAttr === 1) {
      // 세로 이미지
      return styles.verticalImage;
    } else {
      return styles.defaultImage; // 기본 스타일
    }
  }

  function getImageStyle2(imgAttr) {
    if (imgAttr === 0) {
      // 가로 이미지
      return [styles.horizontalImage2, { transform: [{ rotate: "90deg" }] }]; // 가로 이미지를 세로로 회전
    } else if (imgAttr === 1) {
      // 세로 이미지
      return styles.verticalImage2;
    } else {
      return styles.defaultImage2; // 기본 스타일
    }
  }

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getRefreshToken();
      setToken(accessToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token && selectCard) {
      const selectCardUserCardId = selectCard.userCardId;
      getCompareMycardAndRecommendCard(
        token,
        selectCardUserCardId,
        (res) => {
          const cardsData = Array.isArray(res.data) ? res.data : [res.data];
          setCategoryCard(cardsData[0].categoryCard);
          setDdoraeCard(cardsData[0].ddoraeCard);
          setMyCard(cardsData[0].myCard);
          // console.log(selectCardUserCardId, "CompareCard selectCardId");
          // console.log(myCard, "mycard");
        },
        (err) => {
          console.log(err, "IfUseRecommendCard err");
        }
      );
    }
  }, [token, selectCard]);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Modal visible={isModalVisible} transparent animationType="fade">
        <TouchableWithoutFeedback onPress={handleCloseModal}>
          <View style={styles.modalBackground}>
            <View style={styles.modalContent}>
              <Text style={styles.modalText}>사이트가 없어요!</Text>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
      <Pressable
        onPress={() => navigation.navigate("ProductPage1")}
        style={{ alignSelf: "flex-start" }}
      >
        <MaterialCommunityIcons
          name="chevron-left"
          size={40}
          style={styles.nextBtn}
        />
      </Pressable>
      <View style={styles.topcontainer}>
        <View style={styles.maintextContainer}>
          {selectCard.cardCompanyName ? (
            <Text style={styles.maintext}>
              {selectCard.cardCompanyName} |{" "}
              {selectCard.cardType === 1 ? (
                <Text>신용</Text>
              ) : (
                <Text>체크</Text>
              )}
            </Text>
          ) : (
            <Text style={styles.maintext}>선택한 결제카드</Text>
          )}

          {selectCard.cardName ? (
            <Text
              style={styles.cardName}
              numberOfLines={2}
              ellipsizeMode="tail"
            >
              {selectCard.cardName}
            </Text>
          ) : (
            <Text style={styles.cardName}>데이터를 불러오지 못했어요..</Text>
          )}
        </View>

        {selectCard.imagePath ? (
          <Image
            source={{ uri: selectCard.imagePath }}
            style={getImageStyle(selectCard.imgAttr)}
            resizeMode="contain"
          />
        ) : (
          <Image source={require("../../../../assets/card2.png")} />
        )}
      </View>
      <View style={styles.top}>
        <Text style={styles.maintext}>현재카드 이번달 혜택</Text>
        {selectCardBenefit?.totalDiscount ? (
          <Text style={styles.benefitAmount}>
            {selectCardBenefit.totalDiscount.toLocaleString()}원
          </Text>
        ) : (
          <Text>데이터를 불러오지 못했어요..</Text>
        )}
      </View>
      <View style={styles.midContainer}>
        <View style={styles.midUpTitle}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            내 카드 대신 추천카드를 썼다면?
          </Text>
        </View>

        <View style={styles.midUp}>
          <View style={styles.twoCardCompare}>
            <View style={styles.myCard}>
              <Text style={{ fontSize: 10 }}>내 카드</Text>
              {myCard.imagePath ? (
                <Image
                  source={{ uri: myCard.imagePath }}
                  style={getImageStyle2(myCard.imgAttr)}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../../../assets/card2.png")}
                  style={styles.image2}
                />
              )}
            </View>

            <MaterialCommunityIcons
              name="arrow-right-thin"
              size={24}
              style={styles.arrowIcon}
            />

            <View style={styles.otherCard}>
              <Text style={{ fontSize: 10 }}>카테고리 추천 카드</Text>
              {categoryCard.imagePath ? (
                <Image
                  source={{ uri: categoryCard.imagePath }}
                  style={getImageStyle2(categoryCard.imgAttr)}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../../../assets/card2.png")}
                  style={styles.image2}
                />
              )}
            </View>
          </View>

          <View style={styles.compareInfo}>
            <View style={styles.cardInfoContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연회비</Text>
                {myCard.annualFee ? (
                  <Text style={styles.infoAmount}>
                    {myCard.annualFee.toLocaleString()}원
                  </Text>
                ) : (
                  <Text>0원</Text>
                )}
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>월 할인</Text>
                <Text style={styles.infoAmount}>준비중인 기능!</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>전월 실적</Text>
                {myCard.previousPerformance ? (
                  <Text style={styles.infoAmount}>
                    {myCard.previousPerformance.toLocaleString()}원
                  </Text>
                ) : (
                  <Text>0원</Text>
                )}
              </View>
            </View>

            <View style={styles.cardInfoContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연회비</Text>
                {categoryCard.annualFee ? (
                  <Text style={styles.infoAmount}>
                    {categoryCard.annualFee.toLocaleString()}원
                  </Text>
                ) : (
                  <Text>0원</Text>
                )}
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>월 할인</Text>
                <Text style={styles.infoAmount}>준비중인 기능!</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>전월 실적</Text>
                {categoryCard.previousPerformance ? (
                  <Text style={styles.infoAmount}>
                    {categoryCard.previousPerformance.toLocaleString()}원
                  </Text>
                ) : (
                  <Text>0원</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.midBottom}>
          <View style={styles.midUpTitle}>
            <Text style={{ fontSize: 15, fontWeight: "400" }}>
              예상 혜택 금액
            </Text>
          </View>
          <View style={styles.separator}></View>

          <View style={styles.benefitList}>
            <View style={styles.benefitItem}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                *추천카드 혜택
              </Text>
              {discountProfit.afterDiscount ? (
                <Text style={styles.benefitAmount}>
                  {discountProfit.afterDiscount.toLocaleString()}원
                </Text>
              ) : (
                <Text style={styles.benefitAmount}>불러오지 못했어요,,</Text>
              )}
            </View>

            <View style={styles.benefitItem}>
              <Text style={{ fontSize: 15, fontWeight: "500" }}>
                *현재카드 혜택
              </Text>
              {discountProfit.beforeDiscount ? (
                <Text style={styles.benefitAmount}>
                  {discountProfit.beforeDiscount.toLocaleString()}원
                </Text>
              ) : (
                <Text style={styles.benefitAmount}>불러오지 못했어요,,</Text>
              )}
            </View>
          </View>
        </View>

        {/* <View style={styles.bottom}>
          <View style={styles.separator} />
          <View style={styles.resultContainer}>
            <Text style={{ fontSize: 18, fontWeight: "600" }}>*합계</Text>
            <Text>결과</Text>
          </View>
        </View> */}

        <View style={styles.totalContainer}>
          {}
          <Text style={{ fontSize: 20, fontWeight: "400" }}>
            {discountProfit.beforeDiscount ? (
              <Text style={styles.benefitAmount}>
                총{" "}
                <Text style={{ fontSize: 20, fontWeight: "500" }}>
                  {discountProfit.afterDiscount - discountProfit.beforeDiscount}
                  원{" "}
                </Text>
                이득!
              </Text>
            ) : (
              <Text style={styles.benefitAmount}>불러오지 못했어요,,</Text>
            )}
          </Text>
        </View>

        <View style={styles.bottomContainer}>
          <Pressable
            style={styles.applyBtn}
            onPress={() => {
              if (categoryCard.joinPath) {
                Linking.openURL(categoryCard.joinPath);
              } else {
                handleOpenModal();
              }
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
              온라인 신청하기
            </Text>
          </Pressable>
        </View>
      </View>
      <View style={styles.midContainer2}>
        <View style={styles.midUpTitle}>
          <Text style={{ fontSize: 15, fontWeight: "600" }}>
            또래들이 많이 사용하는 카드에요!
          </Text>
        </View>

        <View style={styles.midUp}>
          <View style={styles.twoCardCompare}>
            <View style={styles.myCard}>
              <Text style={{ fontSize: 10 }}>내 카드</Text>
              {myCard.imagePath ? (
                <Image
                  source={{ uri: myCard.imagePath }}
                  style={getImageStyle2(myCard.imgAttr)}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../../../assets/card2.png")}
                  style={styles.image2}
                />
              )}
            </View>

            <MaterialCommunityIcons
              name="arrow-right-thin"
              size={24}
              style={styles.arrowIcon}
            />

            <View style={styles.otherCard}>
              <Text style={{ fontSize: 10 }}>또래인기 추천 카드</Text>
              {ddoraeCard.imagePath ? (
                <Image
                  source={{ uri: ddoraeCard.imagePath }}
                  style={getImageStyle2(ddoraeCard.imgAttr)}
                  resizeMode="contain"
                />
              ) : (
                <Image
                  source={require("../../../../assets/card2.png")}
                  style={styles.image2}
                />
              )}
            </View>
          </View>

          <View style={styles.compareInfo}>
            <View style={styles.cardInfoContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연회비</Text>
                {myCard.annualFee ? (
                  <Text style={styles.infoAmount}>
                    {myCard.annualFee.toLocaleString()}원
                  </Text>
                ) : (
                  <Text>0원</Text>
                )}
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>월 할인</Text>
                <Text style={styles.infoAmount}>준비중인 기능!</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>전월 실적</Text>
                {myCard.previousPerformance ? (
                  <Text style={styles.infoAmount}>
                    {myCard.previousPerformance.toLocaleString()}원
                  </Text>
                ) : (
                  <Text>0원</Text>
                )}
              </View>
            </View>

            <View style={styles.cardInfoContainer}>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>연회비</Text>
                {ddoraeCard.annualFee ? (
                  <Text style={styles.infoAmount}>
                    {ddoraeCard.annualFee.toLocaleString()}원
                  </Text>
                ) : (
                  <Text>0원</Text>
                )}
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>월 할인</Text>
                <Text style={styles.infoAmount}>준비중인 기능!</Text>
              </View>
              <View style={styles.infoBox}>
                <Text style={styles.infoTitle}>전월 실적</Text>
                {ddoraeCard.previousPerformance ? (
                  <Text style={styles.infoAmount}>
                    {ddoraeCard.previousPerformance.toLocaleString()}원
                  </Text>
                ) : (
                  <Text>0원</Text>
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.bottomContainer2}>
          <Pressable
            style={styles.applyBtn}
            onPress={() => {
              if (ddoraeCard.joinPath) {
                Linking.openURL(ddoraeCard.joinPath);
              } else {
                handleOpenModal();
              }
            }}
          >
            <Text style={{ fontSize: 15, fontWeight: "600", color: "white" }}>
              온라인 신청하기
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}

export default CompareCard;

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight + 50,
  },
  topcontainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
  },
  image: {
    height: 80,
    width: 50,
    marginRight: 10,
    marginLeft: 100,
  },
  maintextContainer: {
    flex: 1,
    marginRight: 20,
    padding: 20,
  },
  maintext: {
    fontSize: 17,
    fontWeight: "400",
  },
  cardName: {
    fontSize: 20,
    fontWeight: "600",
    flexShrink: 1,
  },
  midContainer: {
    justifyContent: "center",
    flex: 3,
    maxWidth: width - 20,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    minHeight: 800,
    marginHorizontal: 15,
  },
  midContainer2: {
    justifyContent: "center",
    maxWidth: width - 20,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
    marginTop: 20,
    marginBottom: 20,
    minHeight: 550,
    marginHorizontal: 15,
  },
  bottomContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
    marginBottom: 20,
  },
  bottomContainer2: {
    flexDirection: "row",
    justifyContent: "center",
  },
  applyBtn: {
    borderRadius: 10,
    marginBottom: 40,
    width: 150,
    height: 60,
    backgroundColor: "#6b84ff",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },

  nextBtn: {
    color: "#b0b0b0",
    marginLeft: 15,
  },
  maintext: {
    fontSize: 15,
    fontWeight: "200",
  },
  benefitAmount: {
    fontSize: 15,
  },
  top: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    marginBottom: 15,
    padding: 15,
    marginLeft: 18,
    marginRight: 45,
    justifyContent: "space-between",
    width: 380,
    height: 60,
    backgroundColor: "#e5e5e5",
    borderRadius: 10,
  },
  midUp: {
    flex: 1,
    alignItems: "center",
    marginBottom: -180,
  },
  midBottom: {
    flex: 1,
  },
  bottom: {
    flex: 1,
  },
  separator: {
    height: 1,
    width: "95%",
    backgroundColor: "grey",
    marginLeft: 10,
  },
  midUpTitle: {
    marginTop: 20,
    marginLeft: 10,
    marginBottom: 5,
  },
  twoCardCompare: {
    flexDirection: "row",
    maxWidth: "80%",
    marginTop: 15,
  },
  image2: {
    width: 60,
    height: 90,
    marginTop: 5,
  },
  myCard: {
    marginRight: 60,
    alignItems: "center",
  },
  otherCard: {
    marginLeft: 60,
    marginRight: 10,
    alignItems: "center",
  },
  arrowIcon: {
    alignSelf: "center",
  },
  compareInfo: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },

  cardInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 30,
  },

  infoBox: {
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    marginTop: 5,
    width: 140,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "400",
  },
  infoAmount: {
    fontSize: 16,
    fontWeight: "500",
  },
  benefitList: {
    marginBottom: -100,
  },
  benefitItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 15,
  },
  resultContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
    paddingHorizontal: 15,
    marginTop: 15,
    marginBottom: -100,
  },
  totalContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  horizontalImage: {
    width: 140,
    height: 80,
    marginLeft: 20,
  },
  verticalImage: {
    width: 80,
    height: 140,
    marginLeft: 25,
  },
  horizontalImage2: {
    width: 70,
    height: 110,
    marginTop: 5,
    marginRight: -15,
  },
  verticalImage2: {
    width: 50,
    height: 80,
    marginTop: 18,
  },
  // 모달 관련 스타일
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  modalText: {
    fontSize: 18,
  },
});
