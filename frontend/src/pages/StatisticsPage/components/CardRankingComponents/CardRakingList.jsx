import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  StatusBar,
  Platform,
  Image,
} from "react-native";

function CardRakingList() {
  return (
    <View style={styles.container}>
      <View style={styles.topCard}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../../../../../assets/1등뱃지.png")}
            style={styles.oneBadge}
          />
          <Image
            source={require("../../../../../assets/card.png")}
            style={styles.image}
          ></Image>
          <Text>삼성 taptap 카드</Text>
        </View>
        <View style={styles.topCardText}>
          <Text>약 89,000원의</Text>
          <Text>혜택을 받았어요</Text>
        </View>
      </View>

      <View style={styles.bottomCard}>
        <View style={styles.imageContainer2}>
          <Image
            source={require("../../../../../assets/2등뱃지.png")}
            style={styles.otherBadge}
          />
          <Image
            source={require("../../../../../assets/card.png")}
            style={styles.image2}
          ></Image>
          <View style={styles.otherCardInfo}>
            <Text style={styles.otherCardName}>KB HI GYM 카드</Text>
            <Text style={styles.otherCardAmount}>
              {"                "}약 67,000원
            </Text>
          </View>
        </View>

        <View style={styles.imageContainer2}>
          <Image
            source={require("../../../../../assets/3등뱃지.png")}
            style={styles.otherBadge}
          />
          <Image
            source={require("../../../../../assets/card.png")}
            style={styles.image2}
          ></Image>
          <View style={styles.otherCardInfo}>
            <Text style={styles.otherCardName}>삼성 iD PET 카드</Text>
            <Text style={styles.otherCardAmount}>
              {"                "}약 37,000원
            </Text>
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
    alignItems: "center",
  },
  image: {
    height: 90,
    width: 160,
  },
  image2: {
    flexDirection: "column",
    marginTop: 30,
    height: 80,
    width: 130,
  },
  otherCardName: {
    fontSize: 15,
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
