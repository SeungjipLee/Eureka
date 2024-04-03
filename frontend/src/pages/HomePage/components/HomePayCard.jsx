import { StyleSheet, View, Text, Pressable, Image } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

function HomePayCard () {
  const navigation = useNavigation()
  return (
    <View>
      <View style={styles.header}>
        <Image source={require('../../../../assets/main.png')} style={{width: 100, height: 61, backgroundColor: '#00BFFF', borderRadius: 10, marginStart: 40}}/>
        <View style={{marginLeft: -40}}>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#00BFFF'}}>당신을 위한</Text>
          <Text style={{fontSize: 16, fontWeight: 'bold', color: '#00BFFF'}}>카드 추천 서비스</Text>
        </View>
        <Pressable onPress={() => navigation.navigate('SettingPage')}>
          <View style={styles.settingIcon}>
            <MaterialCommunityIcons 
              name="cog-outline" size={36} color={'#9E9797'}/>
          </View>
        </Pressable>
      </View>
    </View>
  )
}

export default HomePayCard

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
    alignItems:'center'
  },
  easyPay: {
    fontSize: 30,
    fontWeight: 'bold',
    marginLeft: 50,
    color: '#6797ff'
  },
  settingIcon: {
    alignSelf: 'center',
    marginRight: 20,
  },
})