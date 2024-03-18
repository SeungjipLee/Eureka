import { StyleSheet, Text, View } from "react-native"

function QRScanPage() {
  return (
    <View style={styles.container}>
      <Text>QR코드 스캔 페이지</Text>
    </View>
  )
}

export default QRScanPage

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})