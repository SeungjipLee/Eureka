import { StyleSheet, Text, View } from "react-native"

function HomePage() {
  return (
    <View style={styles.container}>
      <Text>홈페이지</Text>
    </View>
  )
}

export default HomePage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})