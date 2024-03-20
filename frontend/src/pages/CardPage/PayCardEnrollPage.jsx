import { StyleSheet, Text, View } from "react-native"

function PayCardEnrollPage() {
  return (
    <View style={styles.container}>
      <Text>결제 카드 추가 페이지</Text>
    </View>
  )
}

export default PayCardEnrollPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})