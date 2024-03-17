import { Image, StyleSheet, View } from "react-native"


function HomeIcon () {
  return (
    <View style={styles.container}>
      <Image 
        style={styles.homeIcon}
        source={require('../../../../assets/favicon.png')}
      />
    </View>
  )
}

export default HomeIcon

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    height: 50,
  },
  homeIcon: {
    width: 50,
    height: 50,
  }
})