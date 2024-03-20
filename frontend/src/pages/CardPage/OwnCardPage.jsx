import { StyleSheet, Text, View } from "react-native"
import CardHome from "./CardHome";


function OwnCardPage() {

  return (
    <View style={styles.container}>
      <CardHome />
      <View style={styles.btn}>
        <Text style={styles.btnTxt}>보유 카드 불러오기</Text>
      </View>
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
  btn: {
    marginTop: 20,
    width:"60%",
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#5087FF',
    borderRadius: 10,
    padding: 10,
  },
  btnTxt: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf:'center'
  }
})