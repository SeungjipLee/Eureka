import { StyleSheet, View, Text, Pressable, FlatList, Image } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';


function OnlyPay () {
  const navigation = useNavigation() 
  const data = [
    {
      date: 12,
      day: "화",
      info : [
        {
          category: "쇼핑",
          title: "주식회사 신세데 통상",
          card: "삼성 탭탭O 카드",
          price: 40000
        }
      ]
    },
    {
      date: 11,
      day: "월",
      info: [
        {
          category: "편의점",
          title: "이마트 24시 녹산더시티",
          card: "KB 알뜰카드",
          price: 12000
        },
        {
          category: "음식점",
          title: "노브랜드 버거 녹산점",
          card: "삼성 탭탭O 카드",
          price: 9800
        }
      ]      
    }
  ]

  const renderDateItem = ({ item }) => {
    return (
      <View style={{ marginVertical: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: 'bold', marginLeft: 20, color: '#999999' }}>
          {item.date}일 {item.day}
        </Text>
        <View style={{ marginVertical: 10, alignSelf: 'center', width: 360, height:1, backgroundColor: '#999999' }}></View>
        <FlatList
          data={item.info}
          renderItem={renderInfoItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    );
  };
  
  const renderInfoItem = ({ item }) => {
    return (
      <View style={{ marginLeft: 20, marginTop: 10, flexDirection:'row', justifyContent:'space-around', alignItems:'center' }}>
        <Image source={require('../../../assets/favicon.png')}/>
        <View>
          <Text style={styles.place}>{item.title}</Text>
          <Text style={styles.anotherinfo}>{item.category} | {item.card}</Text>           
        </View>
        <Text style={styles.price}>{item.price}원</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.backcontainer}>
        <Pressable onPress={() => navigation.navigate('Home')}>
            <MaterialCommunityIcons 
              name="chevron-left" size={50} color={'#B8B8B8'}/>
         </Pressable>
        <Text style={styles.title}>이번 달 어플 결제 금액</Text>
      </View>

      <View style={styles.midcontainer}>
        <Pressable>
            <MaterialCommunityIcons 
              name="chevron-left" size={50} color={'#4F4F4F'}/>
         </Pressable>
         <Text style={styles.title}>3월</Text>
         <Pressable>
            <MaterialCommunityIcons 
              name="chevron-right" size={50} color={'#4F4F4F'} style={styles.nextBtn}/>
         </Pressable>
      </View>

      <View style={styles.wholecontainer}>
        <Text style={styles.wholetext}>어플 결제 총 금액</Text>
        <Text style={styles.wholeprice}>1,300,000 원</Text>
      </View>

      <FlatList
        data={data}
        renderItem={renderDateItem}
        keyExtractor={(item, index) => index.toString()}
      />
    </View>
  )
}

export default OnlyPay

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  title: {
    fontWeight:'bold',
    fontSize: 24,
    marginStart: 20,
  },
  backcontainer: {
    flexDirection:'row',
    alignItems:'center',
    marginLeft: 10,
  },
  midcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems:'center',
    marginVertical: 20,
  },
  wholecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 40,
    alignItems:'center',
  },
  wholetext: {
    fontWeight: '800',
    fontSize: 20,
    marginStart: 40,
  },
  wholeprice : {
    fontWeight: '800',
    fontSize: 24,
    marginEnd: 40,
  },
  nextBtn: {
    marginHorizontal: 16,
  },
  place: {
    fontSize: 16,
    fontWeight: '800'
  },
  anotherinfo: {
    color: '#999999'
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginHorizontal: 20, 
  }
})