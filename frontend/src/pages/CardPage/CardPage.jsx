import { StyleSheet, Text, View } from "react-native"

function CardPage() {
  return (
    <View style={styles.container}>
      <Text>카드 페이지</Text>
    </View>
  )
}

export default CardPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})