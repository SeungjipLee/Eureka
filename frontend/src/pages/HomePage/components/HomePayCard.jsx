import { StyleSheet, View, Text } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
// import MyCarousel from "./MyCarousel";

function HomePayCard () {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.easyPay}>간편 결제</Text>
        <View style={styles.settingIcon}>
          <MaterialCommunityIcons 
            name="cog-outline" size={26}/>
        </View>
      </View>
      <View>
{/*         <MyCarousel /> */}
      </View>
    </View>
  )
}

export default HomePayCard

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  easyPay: {
    fontSize: 24,
    fontWeight: 'bold'
  },
  settingIcon: {
    alignSelf: 'center',
  }
})