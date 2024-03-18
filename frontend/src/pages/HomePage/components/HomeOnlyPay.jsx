import { StyleSheet, View, Text } from "react-native"

function HomeOnlyPay () {
  return (
    <View>
      <View style={styles.midcontainer}>
        <View>
          <Text>이번달 유레카 페이 결제 금액</Text>
          <Text>530,000원</Text>
        </View>
        <View>
          <Text>새 내역 3건</Text>
        </View>
      </View>
    </View>
  )
}

export default HomeOnlyPay

const styles = StyleSheet.create({
  midcontainer: {
    flexDirection: 'row',
  }
})