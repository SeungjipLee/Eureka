import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TokenUtils from "../../stores/TokenUtils";
import { getCardDetail, getCardHistory } from "../../apis/CardAPi";



function CardDetailPage({route}) {
  const navigation = useNavigation()
  const { userCardId } = route.params || {};
  const [token, setToken] = useState('');
  const [cardInfo, setCardInfo] = useState([]);
  const [cardHistory, setCardHistory] = useState([])
  const [month, setMonth] = useState('04')
  const [year, setYear] = useState('2024')
  const [ historyTop3, setHistoryTop3 ] = useState([])

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };
  
    fetchToken();
  }, []);
  const fetchCardList = async () => {
    if (token) {
      try {
        const res = await getCardDetail(token, userCardId);
        setCardInfo(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };
  
  const fetchHistoryList = async () => {
    if (token) {
      try {
        const res = await getCardHistory(token, userCardId, year + month);
        setCardHistory(res.data);
        setHistoryTop3(res.data.myDataCardHistoryList.slice(0, 3));
      } catch (err) {
        console.log(err);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchCardList();
      fetchHistoryList()
      return () => {};
    }, [token])
  );

  let progress;
  if (cardInfo.previousPerformance > 0) {
    progress = (cardHistory.monthTotalConsumption / cardInfo.previousPerformance) * 100;
  } else {
    progress = -1;
  }
  const remaining = cardInfo.previousPerformance - cardHistory.monthTotalConsumption
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit', hour12: false };
    const date = new Date(dateString);
    const formattedDate = new Intl.DateTimeFormat('ko-KR', options).format(date);
    return formattedDate.replace(/\./g, '-').replace(/(\d{4}-\d{2}-\d{2})/, '$1 ').trim();
  }

  const goToPrevMonth = () => {
    let newYear = parseInt(year);
    let newMonth = parseInt(month) - 1;
    if (newMonth === 0) {
      newMonth = 12;
      newYear -= 1;
    }
  
    newMonth = newMonth.toString().padStart(2, '0');
  
    setYear(newYear.toString());
    setMonth(newMonth);
    fetchData(newYear.toString(), newMonth);
  };

  const goToNextMonth = () => {
    let newYear = parseInt(year);
    let newMonth = parseInt(month) + 1;
    if (newMonth === 13) {
      newMonth = 1;
      newYear += 1;
    }
  
    newMonth = newMonth.toString().padStart(2, '0');
  
    setYear(newYear.toString());
    setMonth(newMonth);
    fetchData(newYear.toString(), newMonth);
  };

  const fetchData = async (newYear, newMonth) => {
    if (token) {
      try {
        const cardDetailResponse = await getCardDetail(token, userCardId);
        setCardInfo(cardDetailResponse.data);
  
        const cardHistoryResponse = await getCardHistory(token, userCardId, newYear + newMonth);
        setCardHistory(cardHistoryResponse.data);
        setHistoryTop3(cardHistoryResponse.data.myDataCardHistoryList.slice(0, 3));
      } catch (error) {
        console.log(error);
      }
    }
  };
  

  useEffect(() => {
    fetchData(year, month);
  }, [token, year, month]);

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
      <Pressable onPress={() => navigation.navigate('CardHome')} style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
        <MaterialCommunityIcons name="chevron-left" size={50} color="#B8B8B8"/>
      </Pressable>
      <Text style={styles.title}>카드 정보</Text>

      <Text style={styles.cardName}>{cardInfo.cardName}</Text>
      <Image
        source={{ uri: cardInfo.imagePath }}
        style={cardInfo.imgAttr === 1 ? [styles.cardImg, styles.rotatedImage] : styles.cardImg}
      />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={styles.patch}>
          <Text style={styles.patchfont}>{cardInfo.cardType === 1 ? '신용' : '체크'}</Text>
        </View>
        <View style={styles.patch}>
          <Text style={styles.patchfont}>{cardInfo.paymentEnabled === true ? '결제 카드' : '보유 카드'}</Text>
        </View>
      </View>

      <View style={styles.midContainer}>
        <Text>다음 실적까지 남은 금액</Text>
        {remaining > 0 ? (
          <Text>
            <Text style={styles.remainingAmount}>{remaining.toLocaleString()}</Text>원
          </Text>
        ) : (
          <Text style={styles.achievementText}>실적을 달성하였습니다!</Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#578CFF' }}>{cardHistory.monthTotalConsumption?.toLocaleString()}</Text>원
          </Text>
          <Text style={{ marginHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}>/</Text>
          {
            cardInfo.previousPerformance ?
          <Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#578CFF' }}>{cardInfo.previousPerformance?.toLocaleString()}</Text>원
          </Text> : <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#578CFF' }}>무실적 카드</Text>
          }
        </View>
        <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: progress >= 0 ? `${Math.min(progress, 100)}%` : '100%'}]} />
        {progress >= 0 ? (
          <Text style={styles.progressPercentage}>{progress.toFixed(0)}%</Text>
        ) : (
          ''
        )}
        </View>
      </View>

      <View style={styles.costContainer}>
        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}}>
          <Pressable onPress={goToPrevMonth}>
            <MaterialCommunityIcons name="chevron-left" size={50} color="#B8B8B8"/>
          </Pressable>
          <Text style={{fontSize: 24}}>{year}년 {month}월</Text>
          <Pressable onPress={goToNextMonth}>
            <MaterialCommunityIcons name="chevron-right" size={50} color="#B8B8B8"/>
          </Pressable>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
          <Text style={{ fontSize: 16, marginLeft: 20, marginVertical: 10 }}>이용 내역</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginEnd: 30}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {cardHistory.monthTotalConsumption?.toLocaleString()}
            </Text>
            <Text> 원</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Text style={{ fontSize: 16, marginLeft: 20, marginVertical: 10 }}>받은 혜택</Text>
            <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginEnd: 30}}>
              <Text style={{ fontSize: 20, fontWeight: 'bold', color: '#447FFF' }}>
                {cardHistory.monthTotalDiscount?.toLocaleString()}
              </Text>
              <Text> 원</Text>
            </View>
          </View>
        <Text style={{fontSize: 16, marginTop: 20, margin: 10, fontWeight:'bold', color: '#B4B4B4'}}>최근 결제</Text>
        <View style={{width: '100%', backgroundColor: '#B4B4B4', height: 3, alignSelf:'center'}}></View>
        <ScrollView style={{ maxHeight: 300 }}>
          {historyTop3.reverse().map((item) => (
            <View key={item.cardHistoryId}>
            <View 
              style={{ 
                flexDirection: 'row', 
                justifyContent: 'space-between',
                alignItems:'center',
                padding: 10,
                marginHorizontal: 10,
                }}>
              <View>
                <Text style={{ fontWeight: 'bold' }}>{item.merchantName}</Text>
                <Text style={{ textAlign: 'right', color: '#B4B4B4' }}>{formatDate(item.approvedDateTime)}</Text>  
              </View>
              <View>
                <Text style={{ textAlign: 'right', fontWeight: 'bold', color: '#333', fontSize: 16,}}>{item.approvedAmt?.toLocaleString()}원</Text>
              </View>
            </View>
              <View style={{width: '100%', backgroundColor: '#B4B4B4', height: 1, alignSelf:'center'}}></View>
            </View>
          ))}
        </ScrollView>
        <Pressable onPress={() => navigation.navigate('CardDetailPay', {months: month, userCardId: userCardId})}>
          <View style={{width:'80%', backgroundColor: '#447FFF', borderRadius: 10, height: 40, alignSelf: 'center', marginBottom: 20}}>
            <Text style={{color:'#ffffff', fontSize: 16, fontWeight:'bold', textAlign:'center', marginTop: 8}}>전체 내역 보기</Text>
          </View>
        </Pressable>
      </View>
    </View>
  </ScrollView>
  )
}

export default CardDetailPage

const styles = StyleSheet.create({
  back: {
    marginTop: 40,
    color: '#B8B8B8'
  },
  title: {
    right: 120,
    margin: 15,
    fontSize: 24,
    fontWeight: 'bold'
  },
  cardName: {
    textAlign: 'center',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardImg: {
    width: 240,
    height: 140,
    borderRadius: 10,
  },
  rotatedImage: {
    transform: [{ rotate: '-90deg' }],
    width: 140,
    height: 240,
    marginHorizontal: 20,
    marginEnd: 30,
    marginVertical: -40
  },
  patch: {
     paddingHorizontal: 15,
     paddingVertical: 5, 
     backgroundColor: '#EB7979', 
     borderRadius: 15,
     margin: 5,
     marginBottom: 20,
  },
  patchfont: {
    color: '#ffffff',
    fontWeight:'bold',
    fontSize: 14,
  },
  midContainer: {
    alignSelf: 'center',
    width: '80%',
    backgroundColor: '#ffffff',
    padding : 20,
    borderRadius: 20,
    elevation: 5,
  },
  remainingAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EB7979',
  },
  achievementText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#578CFF',
  },
  progressPercentage: {
    position: 'absolute',
    right: 10,
    color: '#ffffff',
  },
  costContainer: {
    width: '80%',
    height: 500,
    alignSelf:'center',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 15,
    marginBottom: 40,
    borderRadius: 20,
    elevation: 5,
  }
})