import { StyleSheet, Text, View } from "react-native"

function ProductPage() {
  return (
    <View style={styles.container}>
      <Text>카드 상품 페이지</Text>
    </View>
  )
}

export default ProductPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})