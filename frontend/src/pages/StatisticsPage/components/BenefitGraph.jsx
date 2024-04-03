import { useEffect, useState } from "react";
import {
  StyleSheet,
  View,
  Text,
  Dimensions,
  Platform,
  TouchableOpacity,
} from "react-native";
import BenefitCategoryList from "./BenefitGraphComponents/BenefitCategoryList";
import { useDispatch } from "react-redux";
import { benefitTop5Category } from "../../../slices/staticSlice";
import { getMyBenefitAmountOfCategory } from "../../../apis/StatisticsApi";
import TokenUtils from "../../../stores/TokenUtils";

const SCREEN_WIDTH = Dimensions.get("window").width;
const categoryColors = {
  0: "#ebc7fd",
  1: "#fcb3b3",
  2: "#fff6bc",
  3: "#a6fca9",
  4: "#c0c0c0",
  5: "#d8d8d8",
  6: "#aad5fa",
  7: "#90cad6",
  8: "#f2fd75",
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
  19: "#212121",
  20: "#CFD8DC",
  21: "#F5F5F5",
  22: "#baf1a6",
  23: "#B3E5FC",
  24: "#DCEDC8",
  25: "#e3e3e3",
};
const HorizontalBarGraph = ({ categories, totalBenefit }) => {
  return (
    <>
      {totalBenefit === 0 ? (
        <Text style={{ fontSize: 20, fontWeight: "400" }}>
          받은 혜택이 없어요 ㅠㅠ
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
              const width = `${(category.discount / totalBenefit) * 100}%`;
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

function BenefitGraph() {
  const [token, setToken] = useState("");
  const [totalDiscount, setTotalDiscount] = useState("");
  const [categories, setCategories] = useState([]);
  const [LastCategory, setLastCategory] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth() + 1);
  const maxMonth = new Date().getMonth() + 1;
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
      const selectedDate =
        currentMonth < 10 ? `0${currentMonth}` : `${currentMonth}`;
      const currentDate = `${new Date().getFullYear()}${selectedDate}`;

      getMyBenefitAmountOfCategory(
        token,
        currentDate,
        (res) => {
          setTotalDiscount(res.data.totalDiscount);
          setCategories(res.data.discountList);
        },
        (err) => {
          console.log(err, "BenefitGraph, 혜택 카테고리 실패");
        }
      );
    }
  }, [token, currentMonth]);

  const formatTotalDiscount = totalDiscount.toLocaleString("ko-KR");

  const processCategories = (categories) => {
    const topCategories = categories.slice(0, 4);

    const others = categories
      .slice(4)
      .reduce((acc, curr) => acc + curr.discount, 0);

    if (others > 0) {
      topCategories.push({
        categoryId: "25",
        categoryName: "그외..",
        discount: others,
      });
    }
    topCategories.push({ totalDiscount: totalDiscount });

    dispatch(benefitTop5Category(topCategories));
    return topCategories;
  };

  useEffect(() => {
    if (categories.length > 0) {
      setLastCategory(processCategories(categories));
    }
  }, [categories]);

  const moveToPreviousMonth = () =>
    setCurrentMonth(currentMonth > 1 ? currentMonth - 1 : currentMonth);
  const moveToNextMonth = () =>
    setCurrentMonth(currentMonth < maxMonth ? currentMonth + 1 : currentMonth);

  return (
    <View style={styles.container}>
      <View style={styles.monthInfo}>
        <TouchableOpacity
          onPress={moveToPreviousMonth}
          disabled={currentMonth === 1}
        >
          <Text style={styles.navigationText}>{"<"}</Text>
        </TouchableOpacity>
        <Text style={styles.monthText}>{currentMonth}월달의 혜택</Text>
        <TouchableOpacity
          onPress={moveToNextMonth}
          disabled={currentMonth === maxMonth}
        >
          <Text style={styles.navigationText}>{">"}</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.line}></View>
      <View style={styles.topContainer}>
        {categories && categories.length > 0 ? (
          <Text style={styles.BenefitText}>
            {currentMonth}월달에는{" "}
            <Text style={{ fontWeight: "bold" }}>
              {categories[0].categoryName}
            </Text>
            <Text>에서</Text>
          </Text>
        ) : (
          <Text style={styles.BenefitText}>
            이번달에는 <Text style={{ fontWeight: "bold" }}>???</Text>
            <Text>에서</Text>
          </Text>
        )}

        <View style={styles.amountContainer}>
          {totalDiscount === 0 ? (
            <Text>혜택을 받지 못했어요</Text>
          ) : (
            <Text style={styles.BenefitText}>가장 많은 혜택을 누렸어요!</Text>
          )}
        </View>
      </View>
      <HorizontalBarGraph
        categories={LastCategory}
        totalBenefit={totalDiscount}
      />
      <View style={styles.bottomContainer}>
        <BenefitCategoryList />
      </View>
    </View>
  );
}

export default BenefitGraph;

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
    marginLeft: -50,
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
  line: {
    height: 0.6,
    width: 300,
    backgroundColor: "#cfcfcf",
    marginBottom: 10,
  },
  monthInfo: {
    flexDirection: "row",
    marginBottom: 15,
    marginTop: 22,
  },
  monthText: {
    fontSize: 20,
    fontWeight: "500",
  },
  BenefitText: {
    fontSize: 15,
    fontWeight: "400",
    color: "black",
  },
});
