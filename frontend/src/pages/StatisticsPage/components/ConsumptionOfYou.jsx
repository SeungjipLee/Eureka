import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import ConsumptionCategoryList from "./ConsumptionOfYouComponents/ConsumptionCategoryList";
import { useDispatch } from "react-redux";
import { top5Category } from "../../../slices/staticSlice";
import { getMyConsumptionOfCategoryAmount } from "../../../apis/StatisticsApi";
import TokenUtils from "../../../stores/TokenUtils";

const SCREEN_WIDTH = Dimensions.get("window").width;
const categoryColors = {
  0: "#ebc7fd",
  1: "#FF7674",
  2: "#FF7674",
  3: "#a6fca9",
  4: "#c0c0c0",
  5: "#FF8E8C",
  6: "#aad5fa",
  7: "#90cad6",
  8: "#88F2C5",
  9: "#9cd5f2",
  10: "#95e1ff",
  11: "#ffd586",
  12: "#ffc063",
  13: "#CFD8DC",
  14: "#aaaaaa",
  15: "#a1fcbb",
  16: "#52d846",
  17: "#E8F5E9",
  18: "#E1F5FE",
  19: "#ac7575",
  20: "#CFD8DC",
  21: "#F5F5F5",
  22: "#baf1a6",
  23: "#B3E5FC",
  24: "#DCEDC8",
  25: "#e3e3e3",
};
const HorizontalBarGraph = ({ categories, totalConsump }) => {
  return (
    <>
      {totalConsump === 0 ? (
        <Text style={{ fontSize: 20, fontWeight: "400" }}>
          소비 내역이 없어요 ㅠㅠ
        </Text>
      ) : (
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
      )}
    </>
  );
};

function ConsumptionOfYou() {
  const [token, setToken] = useState("");
  const [totalConsumption, setTotalConsumption] = useState("");
  const [categories, setCategories] = useState([]);
  const [LastCategory, setLastCategory] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };
    fetchToken();
  }, []);

  const maxMonth = new Date().getMonth() + 1;

  useEffect(() => {
    if (token) {
      const getSelectedDate = () => {
        const date = new Date();
        const year = date.getFullYear(); // 현재 연도
        // 선택된 달을 기준으로 날짜 생성 (currentMonth 상태 사용)
        return year * 100 + currentMonth; // YYYYMM 형식
      };
      const currentDate = getSelectedDate();
      getMyConsumptionOfCategoryAmount(
        token,
        currentDate,
        (res) => {
          setTotalConsumption(res.data.totalConsumption);
          setCategories(res.data.consumptionList);
          console.log(res.data.consumptionList, "consumptionofyou");
        },
        (err) => {
          console.log(err, "ConsumptionOfYou, 소비 카테고리 불러오기 실패");
        }
      );
    }
  }, [token, currentMonth]);

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

  useEffect(() => {
    if (categories.length > 0) {
      setLastCategory(processCategories(categories));
    }
  }, [categories, token]);

  const moveToPreviousMonth = () =>
    setCurrentMonth(currentMonth > 1 ? currentMonth - 1 : 1);

  const moveToNextMonth = () => {
    const maxMonth = new Date().getMonth() + 1; // 현재 월
    if (currentMonth < maxMonth) {
      setCurrentMonth(currentMonth + 1);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.myConsumptionContainer}>
        <TouchableOpacity
          onPress={moveToPreviousMonth}
          disabled={currentMonth === 1}
        >
          <Text style={styles.navigationText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.myConsumptionText}>내 소비</Text>
        <TouchableOpacity
          onPress={moveToNextMonth}
          disabled={currentMonth >= maxMonth}
        >
          <Text style={styles.navigationText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.topContainer}>
        <Text style={styles.consumptionText}>
          <Text style={{ fontWeight: "bold" }}>{currentMonth}</Text>월달에는
        </Text>
        <View style={styles.amountContainer}>
          <Text style={styles.amountText}>{formatTotalConsumption}</Text>
          <Text style={styles.consumptionText}>원 썼어요!</Text>
        </View>
        <View style={styles.navigationButtons}></View>
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
  navigationText: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#bbbbbb",
    marginHorizontal: 20,
  },
  myConsumptionContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 30,
    marginBottom: 15,
    width: "100%",
    paddingHorizontal: 30,
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
    height: 60,
    width: 280,
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
