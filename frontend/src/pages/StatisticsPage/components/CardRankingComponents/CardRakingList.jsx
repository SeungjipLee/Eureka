import {
  StyleSheet,
  View,
  Text,
  Image,
} from "react-native";
import { getMyTop3Cards} from "../../../../apis/StatisticsApi";
import TokenUtils from "../../../../stores/TokenUtils";
import { useEffect, useState } from "react";

function CardRakingList() {const [token, setToken] = useState("");
const [top3CardList ,setTop3CardList] = useState([])

useEffect(() => {
  const fetchToken = async () => {
    const accessToken = await TokenUtils.getAccessToken();
    setToken(accessToken);
  };
  fetchToken();
}, []);

useEffect(()=>{
  if(token){
    const getCurrentDate = () => {
      const date = new Date();
      const year = date.getFullYear();
      const month = date.getMonth() + 1; 
      return year * 100 + month;
    };
    const currentDate = getCurrentDate();

    getMyTop3Cards(
      token,
      currentDate,
      (res)=>{
        setTop3CardList(res.data.bestCardStatisticsList)
      },
      (err)=>{
        console.log(err, "cardRanking err")
      }
    )
  }
}, [token])

  return (
    <View style={styles.container}>
      <View style={styles.topCard}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../../../assets/1등뱃지.png")}
            style={styles.oneBadge}
          />
          <Image
            source={{uri: top3CardList[0]?.imagePath}}
            style={styles.image}
          ></Image>
          <Text style={{marginTop: 10}}>{top3CardList[0]?.cardName}</Text>
        </View>

        <View style={styles.topCardText}>
          <Text style={{ fontSize: 15, fontWeight: "medium" }}>
            약{" "}
            <Text
              style={{
                color: "#5574ff",
                fontSize: 18,
                fontWeight: "semibold",
              }}
            >
              {top3CardList[0]?.totalDiscount.toLocaleString()}원
            </Text>
            의
          </Text>
          <Text>혜택을 받았어요!</Text>
        </View>
      </View>

      <View style={styles.bottomCard}>
        <View style={styles.imageContainer2}>
          <Image
            source={require("../../../../../assets/2등뱃지.png")}
            style={styles.otherBadge}
          />
          <Image
            source={{uri:top3CardList[1]?.imagePath}}
            style={styles.image2}
          ></Image>
          <View style={styles.otherCardInfo}>
            <Text style={styles.otherCardName}>{top3CardList[1]?.cardName}</Text>
            <Text style={styles.otherCardAmount}>
             약 {top3CardList[1]?.totalDiscount.toLocaleString()}원
            </Text>
          </View>
        </View>

        <View style={styles.imageContainer2}>
          <Image
            source={require("../../../../../assets/3등뱃지.png")}
            style={styles.otherBadge}
          />
          <Image
            source={{uri:top3CardList[2]?.imagePath}}
            style={styles.image2}
          ></Image>
          <View style={styles.otherCardInfo}>
            <Text style={styles.otherCardName}>{top3CardList[2]?.cardName}</Text>{top3CardList[2]?.totalDiscount === 0 ? <Text style={styles.otherCardAmount}>0원</Text>:        <Text style={styles.otherCardAmount}>
           약 {top3CardList[2]?.totalDiscount.toLocaleString()}
            </Text>}
          </View>
        </View>
      </View>
    </View>
  );
}

export default CardRakingList;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  topCard: {},
  imageContainer: {
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer2: {
    flexDirection: "row",
    alignItems: "center",
  },
  topCardText: {
    marginTop: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  bottomCard: {
    marginTop: 15,
  },
  otherCardInfo: {
    flexDirection: "column",
    marginTop: 40,
    marginLeft: 40,
    justifyContent: "center",
    alignItems: "flex-end",
    width: 120
  },
  image: {
    height: 95,
    width: 155,
  },
  image2: {
    flexDirection: "column",
    marginTop: 30,
    height: 80,
    width: 130,
  },
  otherCardName: {
    fontSize: 13,
  },
  otherCardAmount: {
    fontSize: 12,
    color: "#3482ff",
  },
  oneBadge: {
    position: "absolute",
    top: -20,
    left: -20,
    zIndex: 1,
    height: 60,
    width: 50,
  },
  otherBadge: {
    position: "absolute",
    top: 5,
    left: -20,
    zIndex: 1,
    height: 60,
    width: 50,
  },
});
