import React, { useRef, useEffect, useState } from "react";
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

function ChooseOne({ data }) {
  const navigation = useNavigation();
  const animation = useRef(new Animated.Value(0)).current;
  const scrollViewRef = useRef(); // ScrollView ref
  const itemColorMapping = {
    "Item 1": "#FAD2E1",
    "Item 2": "#E2F0CB",
    "Item 3": "#B5EAD7",
    "Item 4": "#C7CEEA",
    "Item 5": "#FFDAC1",
    "Item 6": "#FF9AA2",
    "Item 7": "#FFB7B2",
    "Item 8": "#FF9AA2",
    "Item 9": "#FFB7B2",
    "Item 10": "#FFDAC1",
    "Item 11": "#E2F0CB",
    "Item 12": "#B5EAD7",
    "Item 13": "#C7CEEA",
    "Item 14": "#E4C1F9",
    "Item 15": "#D1E8E2",
    "Item 16": "#EDE7B1",
    "Item 17": "#FAD2E1",
    "Item 18": "#D3AB9E",
    "Item 19": "#84A9AC",
    "Item 20": "#6D8299",
    "Item 21": "#AE96BC",
    "Item 22": "#AC92A6",
    "Item 23": "#9B9B7A",
  };

  const [selected, setSelected] = useState(0);
  const [scrollX, setScrollX] = useState(0); // 스크롤 위치 상태
  const [selectCompanyName, setSelectCompanyName] = useState(data[0]);
  const itemWidth = 70; // 항목의 너비

  useEffect(() => {
    // 선택된 항목에 따라 바의 위치를 애니메이션으로 이동
    // 스크롤 위치를 고려하여 애니메이션 값을 수정
    Animated.timing(animation, {
      toValue: selected * (itemWidth + 40) - scrollX,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [selected, scrollX]);

  const renderItem = (item, index) => {
    return (
      <Pressable
        key={index}
        onPress={() => {
          setSelected(index);
          setSelectCompanyName(item);
        }}
        style={{ width: itemWidth, marginHorizontal: 20, alignItems: "center" }}
      >
        <Text
          style={{
            color: selected === index ? "#4f4f4f" : "#8e8e8e",
            fontSize: 15,
          }}
        >
          {item}
        </Text>
      </Pressable>
    );
  };

  // 선의 스타일을 동적으로 계산합니다.
  const lineStyle = {
    height: 0.2,
    backgroundColor: "#d4d4d4", // 선의 색상
    width: (itemWidth + 10) * data.length, // 선의 길이를 계산
    alignSelf: "center", // 가운데 정렬
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
          <Image
            source={require("../../../../../assets/금융회사_로고아이콘/컬러/PNG/금융아이콘_PNG_농협.png")}
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

// 예시 데이터
const initialData = Array.from(
  { length: 23 },
  (_, index) => `Item ${index + 1}`
);

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
    width: 60, // 바의 너비를 각 항목의 너비와 동일하게 설정
    backgroundColor: "#696969", // 바의 색상
  },
  topContainer: {
    flexDirection: "column", // 요소들을 수직으로 쌓기
    alignItems: "center", // 가운데 정렬
    padding: 10, // 컨테이너에 약간의 여백 추가
    backgroundColor: "#fffeb6",
  },
  nextBtn: {
    marginTop: 30,
    marginBottom: 20,
    color: "#b0b0b0",
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
    fontSize: 20,
    fontWeight: "400",
  },
});
