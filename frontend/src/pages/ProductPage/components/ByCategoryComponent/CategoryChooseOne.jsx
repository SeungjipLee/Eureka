import React, { useRef, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  StyleSheet,
  Text,
  Pressable,
  ScrollView,
  Animated,
  View,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { selectCardId } from "../../../../slices/productSlice";

function CategoryChooseOne({ data }) {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const dispatch = useDispatch();

  const categoryImages = {
    모든가맹점: require("../../../../../assets/CategoryIcon/0.png"),
    대중교통: require("../../../../../assets/CategoryIcon/1.png"),
    주유: require("../../../../../assets/CategoryIcon/2.png"),
    마트: require("../../../../../assets/CategoryIcon/3.png"),
    편의점: require("../../../../../assets/CategoryIcon/4.png"),
    통신: require("../../../../../assets/CategoryIcon/5.png"),
    온라인쇼핑: require("../../../../../assets/CategoryIcon/6.png"),
    쇼핑: require("../../../../../assets/CategoryIcon/7.png"),
    배달앱: require("../../../../../assets/CategoryIcon/8.png"),
    음식점: require("../../../../../assets/CategoryIcon/9.png"),
    주점: require("../../../../../assets/CategoryIcon/10.png"),
    카페: require("../../../../../assets/CategoryIcon/11.png"),
    디저트: require("../../../../../assets/CategoryIcon/12.png"),
    뷰티와피트니스: require("../../../../../assets/CategoryIcon/13.png"),
    공과금: require("../../../../../assets/CategoryIcon/14.png"),
    병원과약국: require("../../../../../assets/CategoryIcon/15.png"),
    애완동물: require("../../../../../assets/CategoryIcon/16.png"),
    교육: require("../../../../../assets/CategoryIcon/17.png"),
    자동차: require("../../../../../assets/CategoryIcon/18.png"),
    레저와스포츠: require("../../../../../assets/CategoryIcon/19.png"),
    영화: require("../../../../../assets/CategoryIcon/20.png"),
    문화와여가: require("../../../../../assets/CategoryIcon/21.png"),
    간편결제: require("../../../../../assets/CategoryIcon/22.png"),
    항공: require("../../../../../assets/CategoryIcon/23.png"),
    여행과숙박: require("../../../../../assets/CategoryIcon/24.png"),
    기타: require("../../../../../assets/CategoryIcon/25.png"),
  };

  const [selected, setSelected] = useState(0);
  const [scrollX, setScrollX] = useState(0);
  const [selectCompanyName, setSelectCompanyName] = useState(data[0].name);
  const itemWidth = 70;

  useEffect(() => {
    Animated.timing(animation, {
      toValue:
        selected * (itemWidth + 40) -
        scrollX +
        ((itemWidth + 40) / 2 - styles.selectedBar.width / 2),
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selected, scrollX]);

  const renderItem = (item, index) => {
    return (
      <Pressable
        key={item.id}
        onPress={() => {
          setSelected(index);
          setSelectCompanyName(item.name);
          dispatch(selectCardId(item.id));
        }}
        style={{ width: itemWidth, marginHorizontal: 20, alignItems: "center" }}
      >
        <Text
          style={{
            color: selected === index ? "#4f4f4f" : "#8e8e8e",
            fontSize: 15,
            fontWeight: "400",
          }}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  const lineStyle = {
    height: 0.2,
    backgroundColor: "#aaaaaa",
    width: (itemWidth + 10) * data.length,
    alignSelf: "center",
  };

  return (
    <View>
      <View
        style={[
          styles.topContainer,
          {
            backgroundColor: "#fcfcfc",
          },
        ]}
      >
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
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <View style={styles.noticeTextContainer}>
            <View style={styles.noticeTextUp}>
              <Text style={styles.companyName}>{selectCompanyName}</Text>
              <Text style={styles.companyName}>에서</Text>
            </View>
            <View>
              <Text style={styles.companyName}>인기있는 카드</Text>
            </View>
          </View>
          <Image
            source={categoryImages[selectCompanyName]}
            style={styles.image}
          />
        </View>
      </View>

      <ScrollView
        ref={scrollViewRef}
        contentContainerStyle={styles.container}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        onScroll={(event) => {
          const scrollPosition = event.nativeEvent.contentOffset.x;
          setScrollX(scrollPosition);
        }}
        scrollEventThrottle={16}
      >
        {data.map(renderItem)}
      </ScrollView>
      <View style={lineStyle} />
      <Animated.View
        style={[
          styles.selectedBar,
          {
            transform: [{ translateX: animation }],
          },
        ]}
      />
    </View>
  );
}

const initialData = [
  { id: 1, name: "모든가맹점" },
  { id: 2, name: "대중교통" },
  { id: 3, name: "주유" },
  { id: 4, name: "마트" },
  { id: 5, name: "편의점" },
  { id: 6, name: "통신" },
  { id: 7, name: "온라인쇼핑" },
  { id: 8, name: "쇼핑" },
  { id: 9, name: "배달앱" },
  { id: 10, name: "음식점" },
  { id: 11, name: "주점" },
  { id: 12, name: "카페" },
  { id: 13, name: "디저트" },
  { id: 14, name: "뷰티와피트니스" },
  { id: 15, name: "공과금" },
  { id: 16, name: "병원과약국" },
  { id: 17, name: "애완동물" },
  { id: 18, name: "교육" },
  { id: 19, name: "자동차" },
  { id: 20, name: "레저와스포츠" },
  { id: 21, name: "영화" },
  { id: 22, name: "문화와여가" },
  { id: 23, name: "간편결제" },
  { id: 24, name: "항공" },
  { id: 25, name: "여행과숙박" },
  { id: 26, name: "기타" },
];

export default function App() {
  return <CategoryChooseOne data={initialData} />;
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    paddingVertical: 20,
  },
  selectedBar: {
    position: "absolute",
    bottom: 0,
    height: 2,
    width: 60,
    backgroundColor: "#696969",
  },
  topContainer: {
    flexDirection: "column",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#fffeb6",
  },
  nextBtn: {
    marginTop: 30,
    marginBottom: 20,
    color: "#e8e8e8",
  },
  noticeTextContainer: {
    marginLeft: 25,
  },
  noticeTextUp: {
    flexDirection: "row",
  },
  image: {
    height: 80,
    width: 80,
    marginRight: 20,
  },
  companyName: {
    fontSize: 22,
    fontWeight: "500",
  },
});
