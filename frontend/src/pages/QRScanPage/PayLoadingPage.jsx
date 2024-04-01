import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Image } from 'react-native';
import { Asset } from 'expo-asset';


const PayLoadingPage = ({ route }) => {
  const navigation = useNavigation();
  const { cardList, totalAmount, orderId } = route.params || {};
  const gif = Asset.fromModule(require('../../../assets/payloading.gif')).uri

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('PayCheck', {cardList: cardList, totalAmount: totalAmount, orderId: orderId});
    }, 5000); 

    return () => clearTimeout(timer)
  }, [navigation])

  return (
    
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <View style={{width:'90%', height: 230, backgroundColor: '#4D85FF', marginTop: -120, borderRadius: 20, marginBottom: -150}}/>
      <View style={{width:'80%', height: 640, backgroundColor:'#ffffff', borderRadius: 20, alignItems:'center', justifyContent:'center'}}>
      <Text style={{fontSize: 16, fontWeight: 'bold' }}>최적의 결제 카드를 파악하고 있어요</Text>
      <Image
        source={{ uri: gif }}
        style={{ width: 200, height: 200 }}
        resizeMode="contain"
      />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default PayLoadingPage;
