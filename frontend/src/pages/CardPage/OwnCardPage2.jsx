import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity } from "react-native"
import { useState } from "react";
import BankListModal from "./BankListModal";


function OwnCardPage2 () {
  const [modalVisible, setModalVisible] = useState(false);
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


  const handleSelectBank = (bank) => {
    console.log('Selected Bank:', bank);
    setModalVisible(false); // 은행 선택 후 모달 닫기
  };

  return (
    <View style={{backgroundColor:'#ffffff'}}>
        <FlatList
          style={styles.listStyle}
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
      <TouchableOpacity onPress={() => setModalVisible(true)}>
        <View style={styles.btn}>
          <Text style={styles.btnTxt}>보유 카드 불러오기</Text>
        </View>
      </TouchableOpacity>
      <BankListModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        onSelect={handleSelectBank}
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
  listStyle: {
    height: 550,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
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
  benefitKey: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  benefitValue: {
    fontSize: 12,
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
    marginVertical: 20,
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
  },
})