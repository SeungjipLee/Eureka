import React from 'react';
import { View, Text, Image, StyleSheet, Button, Pressable } from 'react-native';

function PayComplete({ route, navigation }) {
  const { selectedCard, totalAmount, discountTypes, remaining } = route.params;

  let progress
  if (selectedCard.previousPerformance > 0) {
    progress = ((selectedCard.currentMonthAmount + totalAmount) / selectedCard.previousPerformance) * 100;
  } else {
    progress = -1;
  }

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <View style={{width:'90%', height: 230, backgroundColor: '#4D85FF', marginTop: -120, borderRadius: 20, marginBottom: -150}}/>
      <View style={{width:'80%', height: 640, backgroundColor:'#ffffff', borderRadius: 20, alignItems:'center'}}>
        <Text style={{fontSize: 24, fontWeight:'bold', marginTop: 20}}>결제 완료!</Text>
        <Image source={{uri: selectedCard.imagePath}}
          style={{width: 240, height: 140, borderRadius: 10, alignSelf: 'center', margin: 40, marginBottom: 60}}
        />
        
        <View style={styles.midContainer}>
          {/* <Text>추천 받은</Text> */}
          <Text><Text style={{fontWeight:'bold', fontSize: 18 }}>{selectedCard.cardName}</Text>로</Text>
          {selectedCard.discountAmount ?
            <Text style={styles.detail}>
              <Text style={{ fontWeight: 'bold', fontSize: 20, color: '#3675FF' }}>
                {selectedCard.discountCostType === 'L' ? '리터 당 ' : ""}{selectedCard.discountCost}{selectedCard.discountCostType === '%' ? '%' : '원'} {discountTypes[selectedCard.discountType]} 
              </Text>받아서
            </Text>
            : '' } 

          <Text style={styles.detail}><Text style={{fontWeight: 'bold', fontSize: 26 }}>{totalAmount.toLocaleString()}</Text> 원을 결제했어요!</Text>
          
          {
            remaining !== 0 ? (
              <>
                <Text style={{ fontSize: 18, marginTop: 8 }}>실적 달성까지</Text> 
                  <Text style={styles.detail}>
                    <Text style={{fontSize: 22, fontWeight: 'bold', color: 'green' }}>{remaining.toLocaleString()}</Text> 원 남았어요</Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: progress >= 0 ? `${Math.min(progress, 100)}%` : '100%'}]} />
                  {progress >= 0 ? (
                    <Text style={styles.progressPercentage}>{progress.toFixed(0)}%</Text>
                  ) : (
                    ''
                  )}
                </View>
              </>
            ) : (
              <Text style={styles.achievementText}>{selectedCard.previousPerformance ? '카드 실적을 달성했어요' : ''}</Text>
            )
          }

          <Pressable onPress={() => navigation.navigate('Home')}>
            <View style={styles.button}>
              <Text style={{textAlign:'center', color: '#ffffff', height: 40, fontSize: 20}}>확인</Text>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  midContainer: {
    marginTop: -30,
    alignSelf: 'center',
    width: '85%',
    backgroundColor: '#ffffff',
    padding: 30,
    paddingVertical: 40,
    borderRadius: 20,
    elevation: 5,
  },
  detail: {
    fontSize: 16,
    marginBottom: 4,
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginVertical: 20,
    width: '100%',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#578CFF',
  },
  progressPercentage: {
    position: 'absolute',
    right: 10,
    color: '#ffffff',
    fontWeight: 'bold',
  },
  button: {
    marginTop: 20,
    borderRadius: 10,
    backgroundColor:'#4D85FF',
    paddingTop: 12,
  },
  achievementText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green', // 색상은 원하는 대로 조정 가능
  },
});

export default PayComplete;
