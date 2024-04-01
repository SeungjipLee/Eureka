import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";
import ConsumptionCategoryList from "./ConsumptionOfYouComponents/ConsumptionCategoryList";
import { useDispatch } from "react-redux";
import { top5Category } from "../../../slices/staticSlice";
import { getMyConsumptionOfCategoryAmount } from "../../../apis/StatisticsApi";
import TokenUtils from "../../../stores/TokenUtils";

const SCREEN_WIDTH = Dimensions.get("window").width;
const categoryColors = {
  0: "#ebc7fd",
  1: "#fcb3b3",
  2: "#fff6bc",
  3: "#a6fca9",
  4: "#c0c0c0",
  5: "#FFECB3",
  6: "#aad5fa",
  7: "#90cad6",
  8: "#f2fd75",
  9: "#cdeeff",
  10: "#70fc95",
  11: "#ffd586",
  12: "#ffc063",
  13: "#CFD8DC",
  14: "#aaaaaa",
  15: "#a1fcbb",
  16: "#70ee64",
  17: "#E8F5E9",
  18: "#E1F5FE",
  19: "#212121",
  20: "#CFD8DC",
  21: "#F5F5F5",
  22: "#FFF3E0",
  23: "#B3E5FC",
  24: "#DCEDC8",
  25: "#cdcdcd",
};
const HorizontalBarGraph = ({ categories, totalConsump }) => {
  return (
    <View style={styles.rowGraph}>
      <View
        style={{
          flexDirection: "row",
          height: "100%",
          alignItems: "center",
          width: "100%",
        }}
      >
        {categories.map((category, index) => {
          const width = `${(category.consumption / totalConsump) * 100}%`;
          const color = categoryColors[category.categoryId] || "#E0E0E0";
          const barStyle = {
            height: "100%",
            width,
            backgroundColor: color,
            ...(index === 0 && {
              borderTopLeftRadius: 20,
              borderBottomLeftRadius: 20,
            }),
            ...(index === categories.length - 1 && {
              borderTopRightRadius: 20,
              borderBottomRightRadius: 20,
            }),
          };

          return <View key={index} style={barStyle} />;
        })}
      </View>
    </View>
  );
};

function ConsumptionOfYou() {
  const [token, setToken] = useState("");
  const [totalConsumption, setTotalConsumption] = useState("");
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };
    fetchToken();
  }, []);
  useEffect(() => {
    if (token) {
      const getCurrentDate = () => {
        const date = new Date();
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        return year * 100 + month;
      };
      const currentDate = 202403;
      getMyConsumptionOfCategoryAmount(
        token,
        currentDate,
        (res) => {
          setTotalConsumption(res.data.totalConsumption);
          setCategories(res.data.consumptionList);
        },
        (err) => {
          console.log(err, "소비 카테고리 실패");
        }
      );
    }
  }, [token]);
  const formatTotalConsumption = totalConsumption.toLocaleString("ko-KR");
  const processCategories = (categories) => {
    // 상위 4개 추출
    const topCategories = categories.slice(0, 4);

    // 나머지 "그외" 합산
    const others = categories
      .slice(4)
      .reduce((acc, curr) => acc + curr.consumption, 0);

    // "그외" 카테고리 추가
    if (others > 0) {
      topCategories.push({
        categoryId: "25",
        categoryName: "그외..",
        consumption: others,
      });
    }
    topCategories.push({ totalConsumption: totalConsumption });

    dispatch(top5Category(topCategories));
    return topCategories;
  };

  const LastCategory = processCategories(categories);

  return (
    <View style={styles.container}>
      <View style={styles.myConsumptionContainer}>
        <Text style={styles.myConsumptionText}>내 소비</Text>
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.consumptionText}>
          <Text style={{ fontWeight: "bold" }}>3</Text>월달에는
        </Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{formatTotalConsumption}</Text>
          <Text style={styles.consumptionText}>원 썼어요!</Text>
        </View>
      </View>
      <HorizontalBarGraph
        categories={LastCategory}
        totalConsump={totalConsumption}
      />
      <View style={styles.bottomContainer}>
        <ConsumptionCategoryList />
      </View>
    </View>
  );
}
export default ConsumptionOfYou;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    width: SCREEN_WIDTH - 80,
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
  myConsumptionContainer: {
    marginBottom: 35,
    marginTop: 20,
  },
  myConsumptionText: {
    fontSize: 22,
    fontWeight: "400",
  },
  consumptionText: {
    fontSize: 20,
    fontWeight: "100",
    color: "black",
  },
  amountContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 60,
  },
  amountText: {
    fontSize: 30,
    fontWeight: "400",
    color: "#4D85FF",
    marginRight: 5,
  },
  topContainer: {
    flex: 1,
    marginLeft: -10,
  },
  rowGraph: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 15,
    marginLeft: 20,
    height: 37,
    width: "93%",
    marginRight: 15,
    overflow: "hidden",
    borderRadius: 20,
  },

  bottomContainer: {
    flex: 3,
    maxWidth: 250,
    marginRight: 40,
  },
  categoryBar: {
    height: "100%",
    borderRadius: 10,
  },
});
