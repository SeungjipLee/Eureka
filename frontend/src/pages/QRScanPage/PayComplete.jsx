import React from 'react';
import { View, Text, Image, StyleSheet, Button, Pressable } from 'react-native';

function PayComplete({ route, navigation }) {
  const { selectedCard, totalAmount, discountInfo, progress, remaining } = route.params;

  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <View style={{width:'90%', height: 230, backgroundColor: '#4D85FF', marginTop: -120, borderRadius: 20, marginBottom: -150}}/>
      <View style={{width:'80%', height: 640, backgroundColor:'#ffffff', borderRadius: 20, alignItems:'center'}}>
        <Text style={{fontSize: 24, fontWeight:'bold', marginTop: 20}}>결제 완료!</Text>
        <Image source={{uri: selectedCard.imagePath}}
          style={{width: 240, height: 140, borderRadius: 10, alignSelf: 'center', margin: 40, marginBottom: 60}}
        />
        
        <View style={styles.midContainer}>
          <Text>추천 받은
          <Text style={{fontWeight:'bold', fontSize: 20}}> {selectedCard.cardName}</Text>로</Text>
          <Text style={styles.detail}>{discountInfo} 받아서</Text>
          <Text style={styles.detail}><Text style={{fontWeight: 'bold', fontSize: 20}}>{totalAmount.toLocaleString()}원</Text>을 결제하였습니다!</Text>
          
          {
            remaining !== 0 ? (
              <>
                <Text style={styles.detail}>다음 실적까지 남은 금액: <Text style={{fontSize: 20}}>{remaining.toLocaleString()}원</Text></Text>
                <View style={styles.progressBarContainer}>
                  <View style={[styles.progressBar, { width: progress >= 0 ? `${Math.min(progress, 100)}%` : '0%'}]} />
                  {progress >= 0 ? (
                    <Text style={styles.progressPercentage}>{progress.toFixed(0)}%</Text>
                  ) : (
                    <Text style={styles.progressPercentage}>카드 실적 없음</Text>
                  )}
                </View>
              </>
            ) : (
              <Text style={styles.achievementText}>카드 실적을 달성하였습니다.</Text>
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
    marginBottom: 5,
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
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    color: 'green', // 색상은 원하는 대로 조정 가능
  },
});

export default PayComplete;
