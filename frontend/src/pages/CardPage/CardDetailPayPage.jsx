import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, Pressable, ScrollView } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import TokenUtils from "../../stores/TokenUtils";
import { getCardHistory } from "../../apis/CardAPi";

function CardDetailPayPage({ route }) {
  const navigation = useNavigation()
  const { months, userCardId } = route.params || {};
  const [token, setToken] = useState('')
  const [cardHistory, setCardHistory] = useState([])
  const [month, setMonth] = useState(`${months}`)
  const [year, setYear] = useState('2024')

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };
  
    fetchToken();
  }, []);

  const fetchHistoryList = async () => {
    if (token) {
      try {
        const res = await getCardHistory(token, userCardId, year + month);
        setCardHistory(res.data);
      } catch (err) {
        console.log(err);
      }
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      fetchHistoryList()
      return () => {};
    }, [token])
  );

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
    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth() + 1;

    let newYear = parseInt(year);
    let newMonth = parseInt(month) + 1;

    if (newYear > currentYear || (newYear === currentYear && newMonth > currentMonth)) {
      console.log("현재 월 이후로는 변경할 수 없습니다.");
      return; // 여기서 함수 실행을 중단
    }
  
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
        const cardHistoryResponse = await getCardHistory(token, userCardId, newYear + newMonth);
        setCardHistory(cardHistoryResponse.data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  
  useEffect(() => {
    fetchData(year, month);
  }, [token, year, month]);

  return (
    <View>
      <View style={{flexDirection:'row', alignItems: 'center', marginTop: 30}}>
        <Pressable onPress={() => navigation.navigate('CardDetail')} style={{  marginLeft: 20, marginRight: 60 }}>
          <MaterialCommunityIcons name="chevron-left" size={50} color="#B8B8B8"/>
        </Pressable>
        <Text style={{textAlign: 'center', fontSize: 20}}>카드 결제 내역 상세</Text>
      </View>
        <View style={styles.costContainer}>
            <View style={{flexDirection:'row', justifyContent:'space-around', alignItems:'center'}}>
            <Pressable onPress={goToPrevMonth}>
            <MaterialCommunityIcons name="chevron-left" size={50} color="#B8B8B8"/>
          </Pressable>
          <Text style={{fontSize: 24}}>{year}년 {month}월</Text>
          <Pressable onPress={goToNextMonth}>
            <MaterialCommunityIcons name="chevron-right" size={50} color="#B8B8B8"/>
          </Pressable>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginVertical: 10 }}>
          <Text style={{ fontSize: 16, marginLeft: 20, marginVertical: 10 }}>이용 내역</Text>
          <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginEnd: 30}}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
              {cardHistory.monthTotalConsumption?.toLocaleString()}
            </Text>
            <Text> 원</Text>
            </View>
          </View>

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginBottom: 10}}>
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
            <ScrollView>
              {(cardHistory.myDataCardHistoryList || []).slice().reverse().map((item) => (
                <View key={item.approvedNum}>
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
                      <Text style={{ textAlign: 'right', fontWeight: 'bold', color: '#333', fontSize: 16,}}>{item.approvedAmt.toLocaleString()}원</Text>
                    </View>
                  </View>
                  <View style={{width: '100%', backgroundColor: '#B4B4B4', height: 1, alignSelf:'center'}}></View>
                </View>
              ))}
            </ScrollView>
          </View>
    </View>
  )
}

export default CardDetailPayPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  costContainer: {
    width: '80%',
    height: 680,
    alignSelf:'center',
    backgroundColor: '#ffffff',
    padding: 20,
    marginTop: 20,
    marginBottom: 40,
    borderRadius: 20,
    elevation: 5,
  }
})