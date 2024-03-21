import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, ScrollView } from "react-native";
import axios from 'axios'

function CardList() {
  // 상태를 배열이 아닌 객체로 초기화하면서, 내부에 data 배열을 포함시킴
  const [cards, setCards] = useState({ data: [] });

  const fetchPosts = async () => {
    try {
      const response = await axios.get(
        `http://j10e101.p.ssafy.io:8000/api/card/prod/comp/list/9`
      );
      // 응답에서 받아온 전체 데이터 객체를 상태에 설정
      setCards(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("err");
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  // cards.data 배열을 순회하여 렌더링
  return (
    <ScrollView>
      {cards.data.map((item, index) => (
        <View key={index} style={styles.card}>
          <Text style={styles.cardText}>회사명: {item.companyName}</Text>
          <Text style={styles.cardText}>카드명: {item.cardName}</Text>
          <Text style={styles.cardText}>할인 유형: {item.discountCostType}</Text>
          <Text style={styles.cardText}>할인 금액: {item.discountCost}</Text>
          <Text style={styles.cardText}>대분류: {item.largeCategoryName}</Text>
          {/* 필요한 다른 데이터 필드도 여기에 추가 */}
        </View>
      ))}
    </ScrollView>
  );
}

export default CardList;

// 스타일시트 추가
const styles = StyleSheet.create({
  card: {
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  cardText: {
    marginBottom: 5,
  },
});
