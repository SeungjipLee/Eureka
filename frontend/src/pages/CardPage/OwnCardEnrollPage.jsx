import React from 'react';
import { StyleSheet, View, Text, FlatList, Image } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';

function OwnCardEnrollPage() {
  // 직접 만든 뱅크 데이터를 사용합니다.
  const selectedBankIds = [
    {
      bankId: '1',
      bankName: 'NH농협카드',
      imgUrl: require('../../../assets/favicon.png'),
      cards: [
        {
          idx: 1,
          name: 'NH농협 올원 파이카드',
          img: require('../../../assets/card.png')
        },
        {
          idx: 2,
          name: 'NH농협 올바른 POINT UP 카드',
          img: require('../../../assets/card.png')
        },
        {
          idx: 3,
          name: 'NH농협 올바른 FLEX 카드',
          img: require('../../../assets/card.png')
        },
      ]
    },
    {
      bankId: '2',
      bankName: '하나카드',
      imgUrl: require('../../../assets/favicon.png'),
      cards: [
        {
          idx: 1,
          name: '트래블로그 신용카드',
          img: require('../../../assets/card.png')
        },
        {
          idx: 2,
          name: '하나 CLUB 아메리칸 익스프레스',
          img: require('../../../assets/card.png')
        },
      ]
    },
    {
      bankId: '3',
      bankName: 'BC카드',
      imgUrl: require('../../../assets/favicon.png'),
      cards: [
        {
          idx: 1,
          name: 'BC 바로 에어 플러스',
          img: require('../../../assets/card.png')
        },
        {
          idx: 2,
          name: 'BC 바로 어디로든 그린카드',
          img: require('../../../assets/card.png')
        },
      ]
    },
  ];

  const renderCardItem = ({ item }) => {
    return (
      <View style={styles.cardItem}>
        <Image source={item.img} style={styles.cardImage} />
        <Text style={styles.cardName}>{item.name}</Text>
        <MaterialCommunityIcons name="check" size={24} color={'#C5C5C5'}/>
      </View>
    );
  };

  const renderBankItem = ({ item }) => {
    return (
      <View style={styles.bankContainer}>
        <View style={{flexDirection:'row'}}>
          <Image source={item.imgUrl} />
          <Text style={styles.bankName}>{item.bankName}</Text>
        </View>
        <FlatList
          data={item.cards}
          renderItem={renderCardItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text>보유 카드 불러오기</Text>
      <FlatList
        data={selectedBankIds}
        renderItem={renderBankItem}
        keyExtractor={(item) => item.bankId}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
  },
  bankContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 10,
    borderRadius: 10,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  cardImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  bankName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardName: {
    fontSize: 16,
  },
});

export default OwnCardEnrollPage;
