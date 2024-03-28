import React, { useState, useEffect } from "react";
import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import BankListModal from "./BankListModal";
import { getOwnCard } from "../../apis/CardAPi";
import TokenUtils from '../../stores/TokenUtils';

function OwnCardPage2 () {
  const navigation = useNavigation();
  const [modalVisible, setModalVisible] = useState(false);
  const [token, setToken] = useState('');
  const [cardList, setCardList] = useState([]);

  console.log(token)
  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };
  
    fetchToken();
  }, []);
  
  const fetchCardList = async () => {
    if (token) { 
      getOwnCard(
        token,
        (res) => {
          setCardList(res.data);
        },
        (err) => console.log(err)
      );
    }
  };
  
  useFocusEffect(
    React.useCallback(() => {
      fetchCardList();
      return () => {};
    }, [token])
  );

  const handleSelectBank = (bank) => {
    setModalVisible(false); // 은행 선택 후 모달 닫기
  };

  return (
    <View style={{backgroundColor:'#ffffff'}}>
        <FlatList
          style={styles.listStyle}
          data={cardList}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image
                source={{ uri: item.imagePath }}
                style={[
                  item.imageAttr === 0
                    ? { width: 80, height: 52, marginStart: -15, borderRadius: 10, transform: [{ rotate: '90deg' }] } 
                    : styles.cardImage, 
                ]}
              />
              <View style={{flex: 1}}>
                <Text style={styles.cardTitle}>{item.cardName}</Text>
                <View style={styles.benefitsContainer}>
                  {item.list.map((benefit, index) => (
                    <View key={index} style={styles.benefitRow}>
                      <Text style={styles.benefitKey}>{benefit.largeCategoryName}</Text>
                      <Text style={styles.benefitValue}>
                        {benefit.discountCostType === "%" ? `${benefit.discountCost}% 할인` : `${benefit.discountCost}원 할인`}
                      </Text>
                    </View>
                  ))}
                </View>
              </View>
              <TouchableOpacity style={styles.detailButton} onPress={() => navigation.navigate('CardDetail', { cardId: item.cardId })}>
                <Text style={styles.detailButtonText}>자세히 보기</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      <Pressable onPress={() => setModalVisible(true)}>
        <View style={styles.btn}>
          <Text style={styles.btnTxt}>보유 카드 불러오기</Text>
        </View>
      </Pressable>
      <BankListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelectBank}
      />
    </View>
  );
}

export default OwnCardPage2

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    paddingBottom: 20,
  },
  listStyle: {
    height: 550,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  cardImage: {
    width: 52,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  benefitsContainer: {
    flexDirection: 'row', // 혜택들을 세로로 나열
    alignItems: 'flex-start',
    marginVertical: 5
  },
  benefitRow: {
    flexDirection: 'col',
    alignItems: 'center',
    marginBottom: 4,
    marginRight: 20,
  },
  benefitKey: {
    fontSize: 14,
    fontWeight: 'bold',
    marginRight: 5,
  },
  benefitValue: {
    fontSize: 12,
  },
  detailButton: {
    position: 'absolute',
    right: 20,
    bottom: 7,
  },
  detailButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  btn: {
    marginVertical: 20,
    width: "60%",
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#5087FF',
    borderRadius: 10,
    padding: 10,
  },
  btnTxt: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
});