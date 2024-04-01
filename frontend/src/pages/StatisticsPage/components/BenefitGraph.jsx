import { useEffect, useState } from "react";
import { StyleSheet, View, Text, Dimensions, Platform } from "react-native";
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
  5: "#FFECB3",
  6: "#aad5fa",
  7: "#90cad6",
  8: "#f2fd75",
  9: "#94d5e5",
  10: "#70fc95",
  11: "#ffd586",
  12: "#ffc063",
  13: "#CFD8DC",
  14: "#aaaaaa",
  15: "#fcb0a1",
  16: "#70ee64",
  17: "#E8F5E9",
  18: "#E1F5FE",
  19: "#72afff",
  20: "#CFD8DC",
  21: "#F5F5F5",
  22: "#FFF3E0",
  23: "#B3E5FC",
  24: "#DCEDC8",
  25: "#cdcdcd",
};
const HorizontalBarGraph = ({ categories, totalBenefit }) => {
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
  );
};

function BenefitGraph() {
  const [token, setToken] = useState("");
  const [totalDiscount, setTotalDiscount] = useState("");
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
      getMyBenefitAmountOfCategory(
        token,
        currentDate,
        (res) => {
          setTotalDiscount(res.data.totalDiscount);
          setCategories(res.data.discountList);
        },
        (err) => {
          console.log(err, "혜택 카테고리 실패");
        }
      );
    }
  }, [token]);

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

  const LastCategory = processCategories(categories);

  return (
    <View style={styles.container}>
      <View style={styles.monthInfo}>
        <Text style={styles.monthText}>내 혜택</Text>
      </View>
      <View style={styles.line}></View>
      <View style={styles.topContainer}>
        <Text style={styles.BenefitText}>
          이번달에는{" "}
          <Text style={{ fontWeight: "bold" }}>
            {LastCategory[0].categoryName}
          </Text>
          <Text>에서</Text>
        </Text>
        <View style={styles.amountContainer}>
          <Text style={styles.BenefitText}>가장 많은 혜택을 누렸어요!</Text>
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
    height: 0.7,
    width: 300,
    backgroundColor: "gray",
    marginBottom: 10,
  },
  monthInfo: {
    marginBottom: 15,
    marginTop: 22,
  },
  monthText: {
    fontSize: 22,
    fontWeight: "400",
  },
  BenefitText: {
    fontSize: 15,
    fontWeight: "100",
    color: "black",
  },
});
