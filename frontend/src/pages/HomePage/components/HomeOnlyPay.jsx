import { StyleSheet, View, Text, Image, Pressable } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';



function HomeOnlyPay () {
  const navigation = useNavigation()

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.midcontainer}>
          <Image style={styles.image} source={require('../../../../assets/HomeIcon/CardPayment.png')}/>
          <View>
            <Text style={styles.font}>이번달 페이 결제 금액</Text>
            <Text style={styles.price}>530,000원</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('OnlyPay')}>
            <MaterialCommunityIcons 
              name="chevron-right" size={26} style={styles.nextBtn}/>
          </Pressable>
        </View>
      </View>
    </View>
  )
}

export default HomeOnlyPay

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 20,
    height: 100,
    borderWidth: 2,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    paddingHorizontal: 12,
    shadowColor: '#D7D7D7',
    backgroundColor: '#ffffff'
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
    width: 50,
    height: 50,
    marginHorizontal: 10,
  },
  font : {
    fontSize: 16,
  },
  price: {
    fontWeight: 'bold',
    fontSize: 24,
    color: '#6797ff',
    alignSelf:'flex-end'
  },
  nextBtn: {
    start: 'end',
  }
})