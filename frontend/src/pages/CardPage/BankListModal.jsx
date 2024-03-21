import { FlatList, StyleSheet, Text, View, Image, TouchableOpacity, Modal, TouchableWithoutFeedback } from "react-native"
import { MaterialCommunityIcons } from '@expo/vector-icons';


function BankListModal ({ visible, onClose, onSelect }) {
  const banks = [
    { id: '1', name: 'KB국민카드', imgUrl: require('../../../assets/favicon.png')},
    { id: '2', name: '삼성카드', imgUrl: require('../../../assets/favicon.png') },
    { id: '3', name: 'NH농협카드', imgUrl: require('../../../assets/favicon.png') },
    { id: '4', name: '신한카드', imgUrl: require('../../../assets/favicon.png') },
    { id: '5', name: '현대카드', imgUrl: require('../../../assets/favicon.png') },
    { id: '6', name: '하나카드', imgUrl: require('../../../assets/favicon.png') },
    { id: '7', name: '우리카드', imgUrl: require('../../../assets/favicon.png') },
    { id: '8', name: 'IBK기업은행카드', imgUrl: require('../../../assets/favicon.png') },
    { id: '9', name: '롯데카드', imgUrl: require('../../../assets/favicon.png') },
  ];

  return (
    <Modal
      style={styles.container}
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalView}>
            <Text style={{fontSize: 16, fontWeight:'bold'}}>선택한 카드사</Text>
            <Text style={{fontSize: 16, fontWeight:'bold'}}>보유 카드 불러오기</Text>
            <Text style={{color: '#6396FE', fontSize: 12, marginBottom: 20}}>내 정보가 없는 카드사는 불러오지 않아요</Text>
            <FlatList
              data={banks}
              keyExtractor={(item) => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity style={{flexDirection:'row', justifyContent:'space-between', marginBottom:10, alignItems:'center', height:50,}} onPress={() => onSelect(item)}>
                  <Image source={item.imgUrl}/>
                  <Text style={{fontSize: 18, marginLeft:40, flexGrow: 1, fontWeight:'700', textAlign:'left'}}>{item.name}</Text>
                  <MaterialCommunityIcons 
                    name="check" size={24} color={'#C5C5C5'}/>
                </TouchableOpacity>
              )}
            />
            <View style={{flexDirection:'row'}}>
                <View style={styles.box1}>
                  <Text style={styles.txt1}>닫기</Text>
                </View>
                <View style={styles.box2}>
                  <Text style={styles.txt2}>계속하기</Text>
                </View>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default BankListModal

const styles = StyleSheet.create({
  container: {
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // 반투명 배경 설정
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    width: '100%',
    height: '70%',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
  },
  item: {
    padding: 10,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  itemText: {
    fontSize: 18,
    textAlign: 'center'
  },
  closeButton: {
    backgroundColor: "#2196F3",
  },
  benefitText: {
    marginVertical: 2,
  },
  box1:{
    marginTop: 20,
    width: 120,
    height: 60,
    backgroundColor:'#D9D9D9',
    marginHorizontal:20,
    borderRadius: 20,
  },
  box2: {
    marginTop: 20,
    width: 180,
    height: 60,
    backgroundColor:'#5187FF',
    borderRadius: 20,
  },
  txt1:{
    textAlign:'center',
    marginVertical: 20,
    color: 'white',
    fontSize:20
  },
  txt2:{
    textAlign:'center',
    marginVertical: 16,
    color: 'white',
    fontSize:20
  }
})