import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  Image,
  Pressable,
} from "react-native";
import TokenUtils from "../../../stores/TokenUtils";
import { useNavigation } from "@react-navigation/native";
import { getMyTags, getMyConsumptionOfCategoryAmount } from "../../../apis/StatisticsApi";
import { useDispatch } from "react-redux";
import { tagList } from "../../../slices/staticSlice";
import { TAG } from "../../../utils/ImagePath";

const SCREEN_WIDTH = Dimensions.get("window").width;

const akaData = [
  {
    tagName: "편의점지기",
    image: require("../../../../assets/HomerSimpson.png"),
    color: "#ff886d",
  },
  {
    tagName: "배달고수",
    image: require("../../../../assets/MonkeyDLuffy.png"),
    color: "#6cfe87",
  },
  {
    tagName: "푸드파이터",
    image: require("../../../../assets/foodfighter.png"),
    color: "#FFFCBA",
  },
  {
    tagName: "쇼핑홀릭",
    image: require("../../../../assets/PrincessBubblegum.png"),
    color: "#5ab6fc",
  },
];

function AkaOfYou() {
  const navigation = useNavigation();
  const [token, setToken] = useState("");
  const [akaList, setAkaList] = useState([]);
  // const currentMonth = new Date().getMonth() + 1;
  const [selectedTagIndex, setSelectedTagIndex] = useState("");
  const [selectedTagName, setSelectedTagName] = useState("");
  const dispatch = useDispatch();
  const currentDate = new Date();
  const currentMonth = ("0" + (currentDate.getMonth() + 1)).slice(-2);
  const currentYear = currentDate.getFullYear().toString();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };
    fetchToken();
  }, []);

  useEffect(() => {
    if (token) {
      getMyConsumptionOfCategoryAmount(
        token,
        currentYear + currentMonth,
        (res) => {
          setSelectedTagIndex(res.data.consumptionList[0]?.categoryId - 1)
          setSelectedTagName(TAG[res.data.consumptionList[0]?.categoryId - 1].tagName)
        },
        (err) => {
          console.log(err, "AkaOfYou err");
        }
      );
    }
  }, [token]);

  useEffect(() => {
    if (token) {
      getMyTags(
        token,
        (res) => {
          setAkaList(res.data.tagList);
          dispatch(tagList(res.data.tagList));
          // setSelectedTagName(res.data.tagList[3]?.tagName || "");
        },
        (err) => {
          console.log(err, "AkaOfYou err");
        }
      );
    }
  }, [token]);

  return (
    <View style={styles.container}>
      <View style={styles.noticeContainer}>
        <Text style={styles.AkaText}>이번 달의 당신은</Text>
        {selectedTagName ? (
          <View style={styles.akaContainer}>
            <Text style={{ fontSize: 30, fontWeight: "bold" }}>
              {selectedTagName}{" "}
            </Text>
            <Text style={styles.AkaText}>이에요</Text>
          </View>
        ) : (
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            아직은 칭호가 없어요!
          </Text>
        )}
      </View>

      <View style={[styles.akaCard, { backgroundColor: TAG[selectedTagIndex]?.color }]}>
        <Image source={TAG[selectedTagIndex]?.imgUrl} style={styles.image} />
        <View style={styles.contentContainer}>
          {selectedTagName ? (
            <>
              <Text style={{ fontSize: 30, fontWeight: "800" }}>
                {selectedTagName}{" "}
              </Text>
            </>
          ) : (
            <Text style={{ fontSize: 16, fontWeight: "bold" }}>
              아직은 칭호가 없어요!
            </Text>
          )}
        </View>
      </View>

      <View style={styles.getAka}>
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>칭호획득!</Text>
      </View>

      <View style={styles.seeMoreAka}>
        <Pressable onPress={() => navigation.navigate("MyAkaList")}>
          <Text style={{ color: "#0050FF", textDecorationLine: "underline" }}>
            칭호 더보기
          </Text>
        </Pressable>
      </View>
    </View>
  );
}

export default AkaOfYou;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: SCREEN_WIDTH - 70,
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
  noticeContainer: {
    width: 300,
    height: 80,
    marginTop: 10,
    marginLeft: 20,
  },
  akaContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  AkaText: {
    fontSize: 23,
    fontWeight: "400",
    color: "black",
    marginLeft: 3,
  },
  akaCard: {
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    marginTop: 20,
    height: 80,
    width: 280,
    padding: 10, // Added padding
    backgroundColor: "#FFFCBA",
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
  contentContainer: {
    flex: 1, // Adjusted to take remaining space
    marginLeft: 10, // Give some space between the image and the text
  },
  getAka: {
    marginTop: 15,
  },
  seeMoreAka: {
    marginTop: 25,
  },
  image: {
    height: 60,
    width: 80,
    marginRight: 20,
  },
});
