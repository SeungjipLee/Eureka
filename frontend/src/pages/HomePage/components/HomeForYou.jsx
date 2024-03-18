import { StyleSheet, View, Text } from "react-native"

function HomeForYou () {
  return (
    <View>
      <View>
        <Text>3월 12일 화요일</Text>
        <Text>김싸피님을 위해 준비했어요</Text>
      </View>
      <View style={styles.midcontainer}>
        <View>
          <Text>또래들과 소비 비교해보기</Text>
        </View>
        <View>
          <Text>버튼</Text>
        </View>
      </View>
      <View style={styles.midcontainer}>
        <View>
          <Text>내 소비에 딱 맞는 카드 추천받기</Text>
        </View>
        <View>
          <Text>버튼</Text>
        </View>
      </View>
    </View>
  )
}

export default HomeForYou

const styles = StyleSheet.create({
  midcontainer: {
    flexDirection: 'row',
  }
})