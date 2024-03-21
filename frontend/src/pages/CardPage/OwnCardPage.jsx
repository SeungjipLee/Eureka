import { StyleSheet, Text, View } from "react-native"
import CardHome from "./CardHome";


function OwnCardPage() {

  return (
    <View style={styles.container}>
      <CardHome />
    </View>
  )
}

export default OwnCardPage

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginHorizontal: 20,
    height: 720,
    borderWidth: 2,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    padding: 12,
    paddingTop:20,
    shadowColor: '#D7D7D7',
    backgroundColor: '#ffffff'
  },
})