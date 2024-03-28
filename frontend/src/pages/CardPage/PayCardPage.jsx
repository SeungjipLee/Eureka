import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/native';


function PayCardPage() {
  const navigation = useNavigation()
  const data = [
    {
      imgSrc: require("../../../assets/card.png"),
      title: "KB 국민 My WE:SH 카드",
      now: 321000,
      target: 400000
    },
    {
      imgSrc: require("../../../assets/card.png"),
      title: "다담카드",
      now: 111000,
      target: 300000
    },
    {
      imgSrc: require("../../../assets/card.png"),
      title: "BeV V카드(스카이패스형)",
      now: 0,
      target: 200000
    },
    {
      imgSrc: require("../../../assets/card.png"),
      title: "신한카드 Mr.Life",
      now: 511000,
      target: 400000
    },
    {
      imgSrc: require("../../../assets/card.png"),
      title: "KB 국민 My WE:SH 카드",
      now : 0,
      target: 300000
    },
    {
      imgSrc: require("../../../assets/card.png"),
      title: "KB 국민 My WE:SH 카드",
      now: 10000,
      target: 0
    },
  ]

  return (
    <View style={{backgroundColor:'#ffffff'}}>
      <FlatList
        style={styles.listStyle}
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.cardContainer}>
            <Image source={item.imgSrc} style={styles.cardImage} />
            <View style={{ flex: 1 }}>
              <Text style={styles.cardTitle}>{item.title}</Text>
              {item.target - item.now > 0 ? (
                <Text>
                  이용 실적이 
                  <Text style={styles.highlightText}> {item.target - item.now}원 </Text>
                  남았어요
                </Text>
              ) : (
                <Text style={styles.achievementText}>카드 실적을 달성하였어요!</Text>
              )}
            </View>
          </View>
        )}
      />
      <Pressable onPress={()=>navigation.navigate('PayCardEnroll')}>
        <View style={styles.btnContainer}>
          <Image source={require('../../../assets/HomeIcon/Plus.png')} style={styles.img}/>
          <Text style={{ fontSize: 20, color: '#0050FF' }}>결제 카드 등록하기</ Text>
        </View>
      </Pressable>
    </View>
  )
}

export default PayCardPage

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    paddingBottom: 20,
  },
  listStyle: {
    height: 450,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  cardImage: {
    width: 102,
    height: 64,
    marginRight: 10,
    borderRadius: 8,
  },
  highlightText: {
    color: '#007bff', // 파란색으로 하이라이트
  },
  remainingText: {
    color: '#007bff', // 파란색
  },
  achievementText: {
    color: 'green', // 달성시 색상, 예시로 녹색을 사용했습니다. 원하는 색상으로 변경 가능
  },
  btnContainer: {
    flexDirection: 'row',
    alignItems:'center',
    height: 150,
    width: 300,
    margin:20,
    backgroundColor: '#F3F3F3',
    marginBottom: 100,
    borderRadius: 20,
    justifyContent: 'center',
    elevation: 5
  },
  img: {
    height: 40,
    width: 40,
    marginEnd: 10,
  }
})