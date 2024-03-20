import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Pressable } from "react-native"
import { useNavigation } from '@react-navigation/native';

function OwnCardPage2 () {
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
    <View style={{backgroundColor:'#ffffff'}}>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.cardContainer}>
              <Image
                source={item.imgSrc}
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
  )
}

export default OwnCardPage2

const styles = StyleSheet.create({
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
})