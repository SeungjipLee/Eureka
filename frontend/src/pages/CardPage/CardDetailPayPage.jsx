import { StyleSheet, Text, View, Pressable, ScrollView } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function CardDetailPayPage() {
  const navigation = useNavigation()
  const data = {
    month: 2403,
    name: "삼성카드 taptap O",
    imgUrl: require('../../../assets/card.png'),
    creditCheck: "신용",
    cardStatus: "보유 카드",
    target: 400000,
    now: 224000,
    benefits: 64000,
    consumes: [
      {
        idx: 1,
        place: '스타벅스',
        date: '2024.01.01',
        time: '09:30',
        price: 30000
      },
      {
        idx: 2,
        place: '풋살장',
        date: '2024.01.01',
        time: '09:30',
        price: 41000
      },
      {
        idx: 3,
        place: '욜로 PC방',
        date: '2024.01.01',
        time: '09:30',
        price: 51200
      },
      {
        idx: 4,
        place: '스타벅스',
        date: '2024.01.01',
        time: '09:30',
        price: 13200
      },
      {
        idx: 5,
        place: '풋살장',
        date: '2024.01.01',
        time: '09:30',
        price: 41200
      },
      {
        idx: 6,
        place: '욜로 PC방',
        date: '2024.01.01',
        time: '09:30',
        price: 33200
      },
    ]
  }
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
              <Pressable onPress={() => navigation.navigate('CardHome')} style={{  marginLeft: 20 }}>
                <MaterialCommunityIcons name="chevron-left" size={50} color="#B8B8B8"/>
              </Pressable>
              <Text style={{fontSize: 24}}>3월📅</Text>
              <Pressable onPress={() => navigation.navigate('CardHome')} style={{ marginRight: 20 }}>
                <MaterialCommunityIcons name="chevron-right" size={50} color="#B8B8B8"/>
              </Pressable>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-around', marginTop: 10}}>
              <Text style={{fontSize: 16, marginVertical: 10}}>이용 내역</Text>
              <Text>
                <Text style={{fontSize: 20, fontWeight:'bold'}}>{data.now}</Text>  원
              </Text>
            </View>
            <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-around'}}>
              <Text style={{fontSize: 16, marginVertical: 10}}>받은 혜택</Text>
              <Text>
                <Text style={{fontSize: 20, fontWeight:'bold', color: '#447FFF'}}>{data.benefits}</Text>  원
              </Text>
            </View>
            <Text style={{fontSize: 16, marginTop: 20, margin: 10, fontWeight:'bold', color: '#B4B4B4'}}>최근 결제</Text>
            <View style={{width: '100%', backgroundColor: '#B4B4B4', height: 3, alignSelf:'center'}}></View>
            <ScrollView>
              {data.consumes.map((item) => (
                <View key={item.idx}>
                <View 
                  style={{ 
                    flexDirection: 'row', 
                    justifyContent: 'space-between',
                    alignItems:'center',
                    padding: 10,
                    marginHorizontal: 10,
                    }}>
                  <View>
                    <Text style={{ fontWeight: 'bold' }}>{item.place}</Text>
                    <Text style={{ textAlign: 'right', color: '#B4B4B4' }}>{item.date} {item.time}</Text>  
                  </View>
                  <View>
                    <Text style={{ textAlign: 'right', fontWeight: 'bold', color: '#333', fontSize: 16,}}>{item.price.toLocaleString()}원</Text>
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