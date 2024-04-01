import { View, Text, Image, StyleSheet, Pressable, Modal, FlatList, TouchableOpacity } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { useState, useEffect } from "react";
import TokenUtils from "../../stores/TokenUtils";
import { proceedPay } from "../../apis/CardAPi";


function PayCheck ({route}) {
  const navigation = useNavigation()
  const { cardList, totalAmount, orderId } = route.params || {}
  const [modalVisible, setModalVisible] = useState(false)
  const [selectedCard, setSelectedCard] = useState(cardList[0])
  const [token, setToken] = useState('')
  const [completeData, setCompleteData] = useState('')
  const discountTypes = {
    0: "즉시 할인",
    1: "청구할인",
    2: "포인트 적립"
  };

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };
  
    fetchToken();
  }, []);
  console.log(orderId)

  const progress = (selectedCard.currentMonthAmount / selectedCard.previousPerformance) * 100
  const remaining = selectedCard.previousPerformance - selectedCard.currentMonthAmount

  function handleSubmit () {
    const inputData = {orderId: orderId, userCardId: selectedCard.userCardId}
    proceedPay(
      token,
      inputData,
      (res) => {
        console.log(res)
        navigation.navigate('PayComplete', {
          selectedCard: selectedCard,
          totalAmount: totalAmount,
          discountInfo: `${selectedCard.discountCost}${selectedCard.discountCostType === '%' ? '%' : '원'} ${discountTypes[selectedCard.discountType]}`,
          progress: progress,
          remaining: Math.max(0, remaining - totalAmount)
        });
      },
      
      (err) => {
        console.log(selectedCard.userCardId)
        console.log(err)
        alert('오류 발생! 다시 진행해 주세요.')
        navigation.navigate('Home')
      } 
      )
  }

  return(
    <View style={{flex: 1, justifyContent: 'center', alignItems:'center'}}>
      <View style={{width:'90%', height: 230, backgroundColor: '#4D85FF', marginTop: -120, borderRadius: 20, marginBottom: -150}}/>
      <View style={{width:'80%', height: 640, backgroundColor:'#ffffff', borderRadius: 20, alignItems:'center'}}>
        <Image source={{uri: selectedCard.imagePath}}
        style={{width: 240, height: 140, borderRadius: 10, alignSelf: 'center', margin: 60}}
        />
        

        <View style={styles.midContainer}>
          <Text>
            <Text style={{fontWeight:'bold', fontSize: 20}}>{selectedCard.cardName}</Text> 로 결제하면
          </Text>

          <Text style={{marginVertical: 10}}>
            <Text style={{fontWeight:'bold', fontSize: 20}}>
              <Text style={{fontWeight:'bold', fontSize: 20, color: '#3675FF'}}>{selectedCard.discountCost} {selectedCard.discountCostType}</Text>
              <Text> {discountTypes[selectedCard.discountType]}</Text>
            </Text> 가능해요
          </Text>

        <Text style={{fontWeight:'bold', fontSize: 20, marginBottom: 10}}>다음 실적까지 남은 금액</Text>
        {remaining > 0 ? (
          <Text>
            <Text style={styles.remainingAmount}>{remaining.toLocaleString()}</Text>원
          </Text>  
        ) : (
          <Text style={styles.achievementText}>실적을 달성하였습니다!</Text>
        )}
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#578CFF' }}>{selectedCard.currentMonthAmount.toLocaleString()}</Text>원
          </Text>
          <Text style={{ marginHorizontal: 10, fontSize: 20, fontWeight: 'bold' }}>/</Text>
          <Text>
            <Text style={{ fontSize: 24, fontWeight: 'bold', color: '#578CFF' }}>{selectedCard.previousPerformance.toLocaleString()}</Text>원
          </Text>
        </View>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${Math.min(progress, 100)}%`}]} />
          <Text style={styles.progressPercentage}>{progress.toFixed(0)}%</Text>
        </View>
      </View>
        
        <Pressable onPress={handleSubmit}>
          <View style={{borderRadius: 8, backgroundColor: '#4D85FF', paddingVertical: 15, paddingHorizontal: 30, marginVertical: 25}}>
            <Text style={{color:'#ffffff', fontWeight: 'bold', fontSize: 20, textAlign:'center'}}>{totalAmount.toLocaleString()}원 결제하기</Text>
          </View>
        </Pressable>
      </View>
      <Text onPress={() => setModalVisible(true)} style={{marginTop: 20, marginBottom: -20, fontSize: 16, textDecorationLine: 'underline', color:'#A5A5A5'}}>다른 카드 선택</Text>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
            setModalVisible(!modalVisible);
        }}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
            <View style={styles.modalContainer} onStartShouldSetResponder={() => true}>
                <Text style={{fontSize: 20, fontWeight:'bold', marginVertical: 20}}>다른 카드 선택</Text>
                <FlatList
                    data={cardList}
                    showsVerticalScrollIndicator={false}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.modalItem} onPress={() => {
                            setSelectedCard(item);
                            setModalVisible(!modalVisible);
                        }}>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <Image source={{uri: item.imagePath}} style={[styles.cardImage, item.imgAttr === 1 ? styles.verticalImage : styles.horizontalImage]}/>
                                <View style={{ marginLeft: 10 }}>
                                    <Text style={styles.modalText}>{item.cardName}</Text>
                                    <Text>{item.discountAmount.toLocaleString()}원 할인</Text>
                                </View>
                            </View>
                        </TouchableOpacity>
                    )}
                    keyExtractor={item => item.cardId.toString()}
                />
            </View>
        </Pressable>
      </Modal>
    </View>
  )
}

export default PayCheck

const styles = StyleSheet.create({
  midContainer: {
    marginTop: -30,
    alignSelf: 'center',
    width: '85%',
    backgroundColor: '#ffffff',
    padding : 30,
    paddingVertical: 40,
    borderRadius: 20,
    elevation: 5,
  },
  remainingAmount: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#EB7979',
  },
  achievementText: {
    marginTop: 5,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000000',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 30,
    backgroundColor: '#e0e0e0',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop: 10,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#578CFF',
  },
  progressPercentage: {
    position: 'absolute',
    right: 10,
    color: '#ffffff',
  },
  modalView: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '50%',
    marginVertical: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    marginVertical: 8,
    width: '100%',
    borderBottomWidth: 1, 
    borderBottomColor: '#f0f0f0',
  },
  modalText: {
    fontSize: 18,
    marginTop: -10
  },
  cardImage: {
    resizeMode: 'contain',
    marginBottom: 10,
  },
  horizontalImage: {
    width: 100, 
    height: 60, 
    marginEnd: 10
  },
  verticalImage: {
    width: 60, 
    height: 100, 
    transform: [{rotate: '-90deg'}],
    marginHorizontal: 20,
    marginEnd: 30
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end', 
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContainer: {
    width: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    maxHeight: '80%',
},
})