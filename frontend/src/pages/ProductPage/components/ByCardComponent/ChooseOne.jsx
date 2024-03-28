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
import axios from "axios";
import { selectCardId } from "../../../../slices/productSlice";

function ChooseOne({ data }) {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef();
  const dispatch = useDispatch();
  const itemColorMapping = {
    삼성: "#8A9CC8",
    농협: "#B9D1A8",
    국민: "#7FAED6",
    신한: "#6F9FC3",
    우리: "#C7E89E",
    하나: "#76C1A6",
    기업: "#6F8DBD",
    현대: "#E6A1C4",
    롯데: "#D07A7A",
  };

  const logoImages = {
    삼성: require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_삼성.png"),
    농협: require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_농협.png"),
    국민: require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_국민.png"),
    신한: require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_신한.png"),
    우리: require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_우리.png"),
    하나: require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_하나.png"),
    기업: require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_기업.png"),
    현대: require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_현대.png"),
    롯데: require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_롯데.png"),
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
            fontSize: 17,
            fontWeight: "400",
          }}
        >
          {item.name}
        </Text>
      </Pressable>
    );
  };

  // 선의 스타일을 동적으로 계산합니다.
  const lineStyle = {
    height: 0.2,
    backgroundColor: "#d4d4d4",
    width: (itemWidth + 10) * data.length,
    alignSelf: "center",
  };

  return (
    <View>
      <View
        style={[
          styles.topContainer,
          {
            backgroundColor: itemColorMapping[selectCompanyName] || "#fffeb6",
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
          <Image source={logoImages[selectCompanyName]} style={styles.image} />
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
  { id: 1, name: "국민" },
  { id: 2, name: "삼성" },
  { id: 3, name: "농협" },
  { id: 4, name: "신한" },
  { id: 5, name: "현대" },
  { id: 6, name: "하나" },
  { id: 7, name: "우리" },
  { id: 8, name: "기업" },
  { id: 9, name: "롯데" },
];

export default function App() {
  return <ChooseOne data={initialData} />;
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
