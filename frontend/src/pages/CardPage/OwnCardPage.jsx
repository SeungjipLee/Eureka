import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/native';


function OwnCardPage() {
  const navigation = useNavigation()
  const data = [
    {
      imgSrc: require("../../../assets/card2.png"),
      title: "KB 국민 My WE:SH 카드",
      benefit: {
        "KB Pay": "10% 할인",
        "음식점": "10% 할인",
        "마트": "10% 할인"
      }
    },
    {
      imgSrc: require("../../../assets/card2.png"),
      title: "다담카드",
      benefit: {
        "KB Pay": "10% 할인",
        "음식점": "10% 할인",
        "마트": "10% 할인"
      }
    },
    {
      imgSrc: require("../../../assets/card2.png"),
      title: "BeV V카드(스카이패스형)",
      benefit: {
        "KB Pay": "10% 할인",
        "음식점": "10% 할인",
        "마트": "10% 할인"
      }
    },
    {
      imgSrc: require("../../../assets/card2.png"),
      title: "신한카드 Mr.Life",
      benefit: {
        "관리비": "10% 할인",
        "주유": "리터당 60원 할인",
        "통신": "10% 할인"
      }
    },
    {
      imgSrc: require("../../../assets/card2.png"),
      title: "KB 국민 My WE:SH 카드",
      benefit: {
        "KB Pay": "10% 할인",
        "음식점": "10% 할인",
        "마트": "10% 할인"
      }
    },
    {
      imgSrc: require("../../../assets/card2.png"),
      title: "KB 국민 My WE:SH 카드",
      benefit: {
        "KB Pay": "10% 할인",
        "음식점": "10% 할인",
        "마트": "10% 할인"
      }
    },
  ]

  return (
    <View>
      <View style={styles.container}>
        <View style={{flexDirection:'row', alignItems:'center', margin: 12}}>
          <Text style={styles.title1}>보유 카드</Text>
          <Pressable onPress={() => navigation.navigate('PayCard')}>
            <Text style={styles.title2}>결제 카드</Text>
          </Pressable>
        </View>

        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image
                source={item.imgSrc} // 이미지 경로를 uri로 변경
                style={styles.cardImage}
              />
              <View style={{flex: 1}}>
                <Text style={styles.cardTitle}>{item.title}</Text>
                <View style={styles.benefitsContainer}>
                  {Object.entries(item.benefit).map(([key, value], index) => (
                    <View key={index}>
                      <Text style={styles.benefitKey}>{key}</Text>
                      <Text style={styles.benefitValue}>{value}</Text>
                  </View>
                  ))}
                </View>
              </View>
              <TouchableOpacity style={styles.detailButton}>
                <Text style={styles.detailButtonText}>자세히 보기</Text>
              </TouchableOpacity>
            </View>
          )}
        />

      </View>
      <View style={styles.btn}>
        <Text style={styles.btnTxt}>보유 카드 불러오기</Text>
      </View>
    </View>
  )
}

export default OwnCardPage

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    marginHorizontal: 20,
    height: 680,
    borderWidth: 2,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    padding: 12,
    paddingTop:20,
    shadowColor: '#D7D7D7',
    backgroundColor: '#ffffff'
  },
  title1: {
    fontSize:20,
    fontWeight:'bold',
    marginEnd: 12,
  },
  title2: {
    fontSize: 20,
    fontWeight:'bold',
    color: '#717171'
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    padding: 10,
    paddingBottom: 20,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold'
  },
  cardImage: {
    width: 52,
    height: 80,
    marginRight: 10,
    borderRadius: 8,
  },
  benefitsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  benefitText: {
    width: '33%',
    marginVertical: 2,
  },
  detailButton: {
    position: 'absolute',
    right: 20,
    bottom: 7,
  },
  detailButtonText: {
    color: '#007bff',
    fontSize: 14,
  },
  btn: {
    marginTop: 20,
    width:"60%",
    height: 40,
    alignSelf: 'center',
    backgroundColor: '#5087FF',
    borderRadius: 10,
    padding: 10,
  },
  btnTxt: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf:'center'
  }
})