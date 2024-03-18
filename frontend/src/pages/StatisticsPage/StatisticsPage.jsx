import { StyleSheet, Text, View } from "react-native"

function StatisticsPage() {
  return (
    <View style={styles.container}>
      <Text>통계 페이지</Text>
    </View>
  )
}

export default StatisticsPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})