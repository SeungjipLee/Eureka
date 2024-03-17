import { StyleSheet, View, Text } from "react-native"

function HomePayCard () {
  return (
    <View>
      <View style={styles.header}>
        <Text style={styles.easyPay}>간편 결제</Text>
        <Text style={styles.settingIcon}>설정 아이콘</Text>
      </View>
      <View>
        <Text>Carousel</Text>
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
    backgroundColor: '#e3341b',
  },
  settingIcon: {
    backgroundColor: '#f2232a',
  }
})