import { StyleSheet, View, Text, Image, Pressable } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function HomeMonthly () {
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.subtitle}>이번달 할인 & 소비</Text>
      </View>
        <View style={styles.midcontainer}>
          <Image style={styles.image} source={require('../../../../assets/favicon.png')}/>
          <View>
            <Text style={styles.font}>총 할인 예상 금액</Text>
            <Text style={styles.price}>192,393원</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('StatisticsPage')}>
            <MaterialCommunityIcons 
              name="chevron-right" size={26} style={styles.nextBtn}/>
          </Pressable>
        </View>
        <View style={styles.midcontainer}>
          <Image style={styles.image} source={require('../../../../assets/favicon.png')}/>
          <View>
            <Text style={styles.font}>총 결제 금액</Text>
            <Text style={styles.price}>1,192,393원</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('StatisticsPage')}>
            <MaterialCommunityIcons name="chevron-right" size={26} style={styles.nextBtn}/>
          </Pressable>
        </View>
    </View>
  )
}

export default HomeMonthly

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: 280,
    borderWidth: 2,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    padding: 12,
    paddingTop:20,
    shadowColor: '#D7D7D7',
    backgroundColor: '#ffffff'
  },
  subtitle: {
    fontWeight: 'bold',
    fontSize: 20,
    margin: 12,
  },
  midcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: 80,
    alignItems: 'center',
    padding: 12,
    marginTop: 12,
  },
  image: {
    width: 40,
    height: 40,
    marginEnd: 12,
  },
  font : {
    fontSize: 16,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#6797ff'
  },
  nextBtn: {
    start: 'end',
  }
})