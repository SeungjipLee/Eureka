import { StyleSheet, Text, View } from "react-native"

function CardDetailPayPage() {
  return (
    <View style={styles.container}>
      <Text>카드 단일 소비내역 페이지</Text>
    </View>
  )
}

export default CardDetailPayPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})