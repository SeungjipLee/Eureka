import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, ScrollView } from "react-native";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function Compare() {
  const navigation = useNavigation();

  const compareData = {
    data: [
      {
        title: "통신",
        imgUrl: require('../../../assets/CategoryIcon/5.png'),
        category: 5,
        myPay: 85000,
        comparePay: 85000,
      },
      {
        title: "카페",
        imgUrl: require('../../../assets/CategoryIcon/11.png'),
        category: 11,
        myPay: 31000,
        comparePay: 31000,
      },
      {
        title: "온라인쇼핑",
        imgUrl: require('../../../assets/CategoryIcon/6.png'),
        category: 6,
        myPay: 190000,
        comparePay: 160000,
      },
      {
        title: "대중교통",
        imgUrl: require('../../../assets/CategoryIcon/1.png'),
        category: 1,
        myPay: 110000,
        comparePay: 160000,
      },
    ]
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.backcontainer}>
        <Pressable onPress={() => navigation.navigate('Home')}>
          <MaterialCommunityIcons name="chevron-left" size={50} color="#B8B8B8" />
        </Pressable>
        <Text style={styles.title}>또래와 소비 비교해보기</Text>
      </View>

      <View style={styles.midcontainer}>
        <Text style={[styles.tag, {backgroundColor: '#BBF3FF', color: '#0050FF'}]}>남성</Text>
        <Text style={[styles.tag, {backgroundColor: '#BBFFBE', color: '#0C9B00'}]}>20대 후반</Text>
      </View>

      <View>
        <Text style={styles.title2}>나이가 비슷한 또래 대비</Text>
        <Text style={styles.title2}>3월에 61만원을 덜 썼어요!</Text>
      </View>

      <View style={{marginVertical: 20, alignSelf: 'center', flexDirection: 'row', backgroundColor: '#ffffff', width: '90%', paddingHorizontal: 80, borderRadius: 20, elevation: 5}}>
        <View style={{margin: 10, alignItems: 'center'}}>
          <Text style={{marginVertical: 10}}>104만원</Text>
          <View style={{width: 80, height: 160, backgroundColor: '#D9D9D9', borderRadius: 20}} />
          <Text style={{marginVertical: 10, fontWeight: 'bold'}}>또래 평균</Text>
        </View>
        <View style={{margin: 10, alignItems: 'center'}}>
          <Text style={{marginVertical: 10}}>43만원</Text>
          <View style={{width: 80, height: 160}}>
            <View style={{width: 80, height: 60, backgroundColor: '#729EFF', marginTop: 100, borderRadius: 20}}/>
          </View>
          <Text style={{marginVertical: 10, fontWeight: 'bold'}}>나의 소비</Text>
        </View>
      </View>

      <View style={styles.box}>
        <Text style={{marginStart: 12, marginBottom: 5}}>또래 평균 대비</Text>
        <Text style={{marginStart: 12, marginBottom: 5, fontSize: 16, fontWeight: 'bold'}}>
          <Text style={{color: '#0050FF', fontSize: 20}}>쇼핑</Text>에 지출이 많은 편이에요.
        </Text>


        {compareData.data.map((item, index) => (
          <View key={index} style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginHorizontal: 20, marginVertical: 10
        }}>
        <Image
          source={item.imgUrl} // 실제 경로로 변경해주세요
          style={{ width: 50, height: 50 }}
        />
        <Text style={{ fontWeight: 'bold', flex: 1, marginHorizontal: 20 }}>{item.title}</Text>
        <View style={{ alignItems: 'flex-end' }}>
          <Text style={{ fontSize: 16, textAlign: 'center' }}>{`${item.myPay.toLocaleString()}원`}</Text>
          <Text style={{ textAlign: 'center', fontSize: 12, color: item.myPay > item.comparePay ? 'red' : item.myPay < item.comparePay ? 'green' : '#729EFF' }}>
            {item.myPay === item.comparePay ? "평균과 유사" : `${Math.abs(item.myPay - item.comparePay).toLocaleString()}원 ${item.myPay > item.comparePay ? '더 사용' : '덜 사용'}`}
          </Text>
        </View>
      </View>
    ))}
  </View>
</ScrollView>
);
}

const styles = StyleSheet.create({
container: {
flex: 1,
marginTop: 60,
},
backcontainer: {
flexDirection: 'row',
alignItems: 'center',
marginLeft: 10,
},
title: {
fontWeight: 'bold',
fontSize: 24,
marginStart: 20,
},
midcontainer: {
flexDirection: 'row',
margin: 20,
},
tag: {
marginHorizontal: 12,
borderRadius: 20,
paddingHorizontal: 10,
paddingVertical: 10,
fontWeight: 'bold',
},
title2: {
fontWeight: 'bold',
fontSize: 24,
marginStart: 30,
},
box: {
marginHorizontal: 20,
marginBottom: 30,
borderWidth: 2,
borderColor: '#D7D7D7',
borderRadius: 20,
padding: 12,
paddingTop: 20,
backgroundColor: '#ffffff',
},
// 필요에 따라 추가 스타일을 여기에 정의할 수 있습니다.
});

export default Compare;
