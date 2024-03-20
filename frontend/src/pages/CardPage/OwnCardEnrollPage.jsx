import { StyleSheet, Text, View } from "react-native"

function OwnCardEnrollPage() {
  return (
    <View style={styles.container}>
      <Text>보유 카드 추가 페이지</Text>
    </View>
  )
}

export default OwnCardEnrollPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})