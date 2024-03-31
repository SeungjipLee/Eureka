import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";
import TokenUtils from "../../../stores/TokenUtils";
import { getMyTotalBenefitAmount } from "../../../apis/StatisticsApi";


const SCREEN_WIDTH = Dimensions.get("window").width;

function BenefitAmountOfYou() {
  const [benefitAmount, setBenefitAmount] = useState("")
 const [token, setToken] = useState("");
  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  useEffect(() => {
    if(token){
      const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1; 
        return year * 100 + month;
      };
      const currentDate = getCurrentDate();

      getMyTotalBenefitAmount(
        token,
        currentDate,
        (res)=>{
          setBenefitAmount(res.data.totalDiscount)
          console.log(res.data, "혜택금액불러오기성공 BenefitAmountOfYou")
        },
        (err)=>{
          console.log(err, "혜택금액불러오기 실패")
        }
      )
    }
  }, [token])

  const formatBenefitAmount = benefitAmount.toLocaleString('ko-KR')
  return (
    <View>
      <View style={styles.container}>
        <Text style={styles.benefitText}>이번달 혜택 금액은</Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{formatBenefitAmount}</Text>
          <Text style={styles.won}>원</Text>
        </View>
        <Text style={styles.benefitText}>이에요!</Text>
      </View>
    </View>
  );
}

export default BenefitAmountOfYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#4D85FF",
    width: SCREEN_WIDTH - 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    ...Platform.select({
      ios: {
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
      },
      android: {
        elevation: 5,
      },
    }),
  },
  benefitText: {
    fontSize: 25,
    fontWeight: "100",
    color: "white",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  amountText: {
    fontSize: 40,
    fontWeight: "400",
    color: "white",
  },
  won: {
    fontSize: 20,
    fontWeight: "200",
    color: "white",
    marginTop: 10,
    marginLeft: 10,
  },
});
