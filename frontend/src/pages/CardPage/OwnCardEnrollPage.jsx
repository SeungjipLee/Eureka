import React from 'react';
import { StyleSheet, View, Text, FlatList, Image, Pressable } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


function OwnCardEnrollPage() {
  const navigation = useNavigation()
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
    {
      bankId: '4',
      bankName: 'KB국민카드',
      imgUrl: require('../../../assets/favicon.png'),
      cards: [
        {
          idx: 1,
          name: '국민 첫번째 카드',
          img: require('../../../assets/card.png')
        },
        {
          idx: 2,
          name: '국민 두번째 카드',
          img: require('../../../assets/card.png')
        },
        {
          idx: 3,
          name: '국민 세번째 카드',
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
        <View  style={{ flex: 1, alignItems:'flex-end', marginEnd: 10 }}>
          <MaterialCommunityIcons name="check" size={24} color={'#C5C5C5'} />
        </View>
      </View>
    );
  };

  const renderBankItem = ({ item }) => {
    return (
      <View>
        <View style={{flexDirection:'row', marginTop:10, alignItems:'center' }}>
          <Image source={item.imgUrl} style={{ height: 30, width: 30, marginEnd: 10}}/>
          <Text style={styles.bankName}>{item.bankName}</Text>
        </View>
        <View style={{ height: 1, backgroundColor:'#C5C5C5', marginVertical: 5 }}></View>
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
      <View style={{marginStart: 20, marginTop: 40, flexDirection:'row', alignItems: 'center'}}>
        <Pressable onPress={() => navigation.navigate('보유 카드')}>
          <MaterialCommunityIcons 
            name="chevron-left" size={50} color={'#B8B8B8'} />
        </Pressable>
        <Text style={{fontWeight: 'bold', fontSize: 24}}>보유 카드 불러오기</Text>
      </View>
      <FlatList
        style={styles.bankContainer}
        data={selectedBankIds}
        contentContainerStyle={{ paddingBottom: 40 }}
        renderItem={renderBankItem}
        keyExtractor={(item) => item.bankId}
      />
      <Text style={{textAlign:'center', fontSize: 16, fontWeight:'bold', marginBottom: 10}}><Text style={{color: 'blue', fontSize: 24}}>3</Text>개 선택됨</Text>
      <View style={styles.btn}>
        <Text style={{color: 'white', textAlign:'center', fontSize: 20}}>선택 완료</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 750,
    marginTop: 20,
  },
  bankContainer: {
    backgroundColor: '#ffffff',
    padding: 20,
    margin: 20,
    borderRadius: 20,
  },
  cardItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 10,
    elevation: 5,
  },
  cardImage: {
    width: 60,
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
  btn: {
    alignSelf:'center',
    width:'50%',
    height: 50,
    padding: 10,
    backgroundColor: 'blue',
    marginBottom: 10,
    borderRadius: 10,
  }
});

export default OwnCardEnrollPage;