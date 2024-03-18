import { StyleSheet, View, Text } from "react-native"

function HomeMonthly () {
  return (
    <View>
      <View>
        <Text>이번달 할인 & 소비</Text>
      </View>
      <View style={styles.midcontainer}>
        <View>
          <Text>총 할인 예상 금액</Text>
          <Text>192,393원</Text>
        </View>
        <View>
          <Text>버튼</Text>
        </View>
      </View>
      <View style={styles.midcontainer}>
        <View>
          <Text>총 결제 금액</Text>
          <Text>1,192,393원</Text>
        </View>
        <View>
          <Text>버튼</Text>
        </View>
      </View>
    </View>
  )
}

export default HomeMonthly

const styles = StyleSheet.create({
  midcontainer: {
    flexDirection: 'row',
  }
})