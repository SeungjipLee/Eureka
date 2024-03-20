import { StyleSheet, View, Text, Pressable, FlatList, Image, ScrollView } from "react-native"
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

  const compareData = {
    data: [
      {
        title: "주거/통신",
        category: 1,
        myPay : 85000,
        comparePay: 85000
      },
      {
        title: "카페/간식",
        category: 2,
        myPay : 31000,
        comparePay: 31000
      },
      {
        title: "쇼핑",
        category: 3,
        myPay : 190000,
        comparePay: 160000
      },
      {
        title: "교통/자동차",
        category: 4,
        myPay : 110000,
        comparePay: 160000
      },

    ]
  }

  return (
    <ScrollView style={styles.container}>
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

      <View style={styles.box}>
        <Text style={{ marginStart: 12, marginBottom: 5 }}>또래 평균 대비</Text>
        <Text style={{ marginStart: 12, marginBottom: 5, fontSize: 16, fontWeight: 'bold'}}>
          <Text style={{ color: '#0050FF', fontSize: 20 }}>쇼핑</Text>에 지출이 많은 편이에요.
        </Text>

        <FlatList
          data={compareData.data}
          keyExtractor={item => item.category.toString()}
          renderItem={({ item }) => {
            // myPay와 comparePay의 차이 계산
            const diff = item.myPay - item.comparePay;
            let textColor, textContent;
            if (diff > 5000) {
              textColor = 'blue';
              textContent = `${diff.toLocaleString()}원`;
            } else if (diff < -5000) {
              textColor = 'red';
              textContent = `${diff.toLocaleString()}원`;
            } else {
              textColor = 'black';
              textContent = "평균과 유사합니다";
            }
          
            return (
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems:'center', marginHorizontal: 20,        marginVertical: 10 }}>
                <Image
                  source={require('../../../assets/favicon.png')}
                  style={{ width: 50, height: 50 }} // 이미지 크기 조정을 위한 스타일
                />
                <Text style={{ fontWeight: 'bold', flex: 1, marginHorizontal: 20 }}>{item.title}</Text>
                <View style={{ alignItems: 'flex-end' }}>
                  <Text style={{ fontSize: 16, textAlign:'center'}}>{`${item.myPay.toLocaleString()}원`}</Text>
                  <Text style={{ textAlign:'center', fontSize: 12, color: textColor }}>
                    {textContent}
                  </Text>
                </View>
              </View>
            );
          }}
        />

      </View>
    </ScrollView>
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
    alignSelf: 'center',
    borderRadius: 20,
    padding: 20,
    backgroundColor:'#ffffff',
    elevation: 5
  },
  box: {
    marginHorizontal: 20,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    padding: 12,
    paddingTop:20,
    shadowColor: '#D7D7D7',
    backgroundColor: '#ffffff'
  }
})