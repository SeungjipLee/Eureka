import { StyleSheet, Text, View, Image, Pressable, ScrollView } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


function CardDetailPage() {
  const navigation = useNavigation()
  const data = {
    month: 3,
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
        
      }
    ]
  }

  const progress = (data.now / data.target) * 100
  const remaining = data.target - data.now

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ flex: 1, alignItems: 'center', marginTop: 40 }}>
      <Pressable onPress={() => navigation.navigate('CardHome')} style={{ alignSelf: 'flex-start', marginLeft: 20 }}>
        <MaterialCommunityIcons name="chevron-left" size={50} color="#B8B8B8"/>
      </Pressable>
      <Text style={styles.title}>카드 정보</Text>

      <Text style={styles.cardName}>{data.name}</Text>
      <Image source={data.imgUrl} style={styles.cardImg} />
      <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
        <View style={styles.patch}>
          <Text style={styles.patchfont}>{data.creditCheck}</Text>
        </View>
        <View style={styles.patch}>
          <Text style={styles.patchfont}>{data.cardStatus}</Text>
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
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#578CFF' }}>{data.now.toLocaleString()}</Text>원
          </Text>
          <Text style={{ marginHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}>/</Text>
          <Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#578CFF' }}>{data.target.toLocaleString()}</Text>원
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${Math.min(progress, 100)}%`}]} />
          <Text style={styles.progressPercentage}>{progress.toFixed(0)}%</Text>
        </View>
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
    width: 220,
    height: 120,
    borderRadius: 10,
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