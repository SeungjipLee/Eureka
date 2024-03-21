import { StyleSheet, View, Text, Pressable } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { BarChart } from "react-native-chart-kit";
import { Dimensions } from "react-native";

function Compare () {
  const navigation = useNavigation()
  
  const chartData = {
    labels: ["또래 평균", "나의 소비", ""],
    datasets: [
      {
        data: [104, 43, 0]
      }
    ]
  }

  const chartConfig = {
    backgroundColor: "#fff",
    backgroundGradientFrom: "#fff",
    backgroundGradientTo: "#fff",
    decimalPlaces: 0, // 소수점 아래 자리수
    color: (opacity = 1, index) => {
      // index 파라미터를 사용하여 각 데이터 포인트에 대한 색상을 다르게 설정
      // 예를 들어, 첫 번째 막대(또래 평균)는 기본 색상, 두 번째 막대(나의 소비)는 파란색
      switch(index) {
        case 0:
          return `rgba(64, 64, 64, ${opacity})`; // 또래 평균의 색상
        case 1:
          return `rgba(0, 116, 217, ${opacity})`; // 나의 소비의 색상
        default:
          return `rgba(0, 0, 0, ${opacity})`;
      }
    },
    labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
    style: {
      borderRadius: 16
    },
    fromZero: true,
    // 막대 상단의 숫자 표시에 대한 설정은 여기에 추가할 수 없음
  }

  return (
    <View style={styles.container}>
      <View style={styles.backcontainer}>
        <Pressable onPress={() => navigation.navigate('Home')}>
            <MaterialCommunityIcons 
              name="chevron-left" size={50} color={'#B8B8B8'}/>
         </Pressable>
        <Text style={styles.title}>또래와 소비 비교해보기</Text>
      </View>

      <View style={styles.midcontainer}>
        <Text style={[styles.tag, {backgroundColor: '#BBF3FF', color: '#0050FF'}]}>남성</Text>
        <Text style={[styles.tag, {backgroundColor: '#BBFFBE', color: '#0C9B00'}]}>20대 후반</Text>
      </View>

      <View>
        <Text style={styles.title2}>나이가 비슷한 또래 대비</Text>
        <Text style={styles.title2}>2월에 60만원을 덜 썼어요!</Text>
      </View>

      <View style={{marginVertical:20}}>
        <BarChart
          style={styles.chart}
          data={chartData}
          width={(Dimensions.get("window").width)*0.8}
          height={(Dimensions.get("window").width)*0.5}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={0}
        />
      </View>

      <View>
        <Text>또래 평균 대비</Text>
        <Text>쇼핑</Text>
      </View>
    </View>
  )
}

export default Compare

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  title: {
    fontWeight:'bold',
    fontSize: 24,
    marginStart: 20,
  },
  backcontainer: {
    flexDirection:'row',
    alignItems:'center',
    marginLeft: 10,
  },
  midcontainer: {
    flexDirection: 'row',
    margin: 20,
  },
  tag: {
    marginHorizontal: 12,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    fontWeight: 'bold'
  },
  title2: {
    fontWeight:'bold',
    fontSize: 24,
    marginStart: 30,
  },
  chart: {
    alignSelf: 'center'
  }
})