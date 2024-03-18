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
      <View style={styles.carousel}>
{/*         <MyCarousel /> */}
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
  },
  easyPay: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 12,
  },
  settingIcon: {
    alignSelf: 'center',
    marginRight: 12,
  },
  carousel: {
    height: 250,
    backgroundColor: 'blue',
    marginBottom: 12,
  }
})