import { View, Text, Image, StyleSheet, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/native';


function PayCheck () {
  const navigation = useNavigation()
  const data = {
    name: "삼성 iD ON 카드",
    cost: 7,
    priceType: "%",
    discountType: "청구할인",
    now: 324000,
    target: 400000,
  }
  const progress = (data.now / data.target) * 100
  const remaining = data.target - data.now

  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <View style={{width:'90%', height: 230, backgroundColor: '#4D85FF', marginTop: -120, borderRadius: 20, marginBottom: -150}}/>
      <View style={{width:'80%', height: 640, backgroundColor:'#ffffff', borderRadius: 20, alignItems:'center'}}>
        <Image source={require('../../../assets/card.png')}
        style={{width: 240, height: 140, borderRadius: 10, alignSelf: 'center', margin: 60}}
        />
        

        <View style={styles.midContainer}>
          <Text>
            <Text style={{fontWeight:'bold', fontSize: 20}}>{data.name}</Text> 로 결제하면
          </Text>

          <Text style={{marginVertical: 10}}>
            <Text style={{fontWeight:'bold', fontSize: 20}}>
              <Text style={{fontWeight:'bold', fontSize: 20, color: '#3675FF'}}>{data.cost} {data.priceType}</Text>
              <Text>{data.discountType}</Text>
            </Text> 가능해요
          </Text>

        <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 10}}>다음 실적까지 남은 금액</Text>
        {remaining > 0 ? (
          <Text>
            <Text style={styles.remainingAmount}>{remaining.toLocaleString()}</Text>원
          </Text>
        ) : (
          <Text style={styles.achievementText}>실적을 달성하였습니다!</Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#578CFF' }}>{data.now}</Text>원
          </Text>
          <Text style={{ marginHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}>/</Text>
          <Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#578CFF' }}>{data.target}</Text>원
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${Math.min(progress, 100)}%`}]} />
          <Text style={styles.progressPercentage}>{progress.toFixed(0)}%</Text>
        </View>
      </View>
        
        <Pressable onPress={()=>navigation.navigate('PayComplete')}>
          <View style={{borderRadius: 8, backgroundColor: '#4D85FF', paddingVertical: 15, paddingHorizontal: 30, marginTop: 25}}>
            <Text style={{color:'#ffffff', fontWeight: 'bold', fontSize: 20, textAlign:'center'}}>32,000원 결제하기</Text>
          </View>
        </Pressable>
      </View>
      <Text style={{marginTop: 20, marginBottom: -20, fontSize: 16, textDecorationLine: 'underline', color:'#A5A5A5'}}>다른 카드 선택</Text>
    </View>
  )
}

export default PayCheck

const styles = StyleSheet.create({
  midContainer: {
    marginTop: -30,
    alignSelf: 'center',
    width: '85%',
    backgroundColor: '#ffffff',
    padding : 30,
    paddingVertical: 40,
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
})