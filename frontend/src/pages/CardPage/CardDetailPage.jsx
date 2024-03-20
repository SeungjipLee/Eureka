import { StyleSheet, Text, View } from "react-native"

function CardDetailPage() {
  return (
    <View style={styles.container}>
      <Text>카드 단일 페이지</Text>
    </View>
  )
}

export default CardDetailPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})