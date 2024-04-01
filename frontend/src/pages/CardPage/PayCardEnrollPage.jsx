import React, { useRef, useState, useEffect } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TokenUtils from '../../stores/TokenUtils';
import { addPayCard } from '../../apis/CardAPi';

function PayCardEnrollPage() {
  const navigation = useNavigation()
  const [token, setToken] = useState('');

  useEffect(() => {
    const fetchToken = async () => {
      const accessToken = await TokenUtils.getAccessToken();
      setToken(accessToken);
    };

    fetchToken();
  }, []);

  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();
  const expiryMonthRef = useRef(); 
  const expiryYearRef = useRef(); 
  const cvcRef = useRef();
  const cardPasswordRef = useRef();

  const [cardNumber1, setCardNumber1] = useState('')
  const [cardNumber2, setCardNumber2] = useState('')
  const [cardNumber3, setCardNumber3] = useState('')
  const [cardNumber4, setCardNumber4] = useState('')
  const [cardDueMonth, setCardDueMonth] = useState('')
  const [cardDueYear, setCardDueYear] = useState('')
  const [cardCVC, setCardCVC] = useState('')
  const [cardPassword, setCardPassword] = useState('')

  const onChange = (text, nextInput, maxLength) => {
    if (text.length === maxLength && nextInput) {
      nextInput.current.focus();
    }
  };

  const handleSubmit = async () => {
    const inputData = {
      cardNumber: cardNumber1+cardNumber2+cardNumber3+cardNumber4,
      cvc: cardCVC,
      expired_year: cardDueYear,
      expired_month: cardDueMonth,
      password: cardPassword
    }
    
    // console.log(inputData)
    // console.log(typeof(inputData))

    addPayCard(
      token,
      inputData,
      (res) => console.log(res),
      (err) => console.log(err)
    )
    navigation.navigate('결제 카드')
  }


  return (
    <View style={styles.container}>
      <Pressable onPress={() => navigation.navigate('CardHome')}>
        <MaterialCommunityIcons 
          name="chevron-left" size={50} color={'#B8B8B8'} style={styles.backBtn}/>
      </Pressable>
      <Text style={styles.title}>결제 카드 등록</Text>
      <Text style={styles.subTitle}>카드번호</Text>
      <View style={{flexDirection: 'row', marginStart: 28, marginBottom: 40}}>
      <TextInput
          style={styles.input4}
          editable={true}
          multiline={false}
          maxLength={4}
          onChangeText={text => {
            setCardNumber1(text)
            onChange(text, input2Ref, 4)
          }}
          keyboardType="numeric"
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Text style={styles.dash}>-</Text>
        <TextInput
          style={styles.input4}
          editable={true}
          multiline={false}
          maxLength={4}
          onChangeText={text => {
            setCardNumber2(text)
            onChange(text, input3Ref, 4)
          }}
          ref={input2Ref}
          keyboardType="numeric"
          secureTextEntry={true} // 카드번호 가운데 부분 가리기를 원치 않는 경우 false로 설정
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Text style={styles.dash}>-</Text>
        <TextInput
          style={styles.input4}
          editable={true}
          multiline={false}
          maxLength={4}
          onChangeText={text => {
            setCardNumber3(text)  
            onChange(text, input4Ref, 4)
          }}  
          ref={input3Ref}
          keyboardType="numeric"
          secureTextEntry={true}
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Text style={styles.dash}>-</Text>
        <TextInput
          style={styles.input4}
          editable={true}
          multiline={false}
          maxLength={4}
          onChangeText={text => {
            setCardNumber4(text)
            onChange(text, expiryMonthRef, 4)
          }}
          ref={input4Ref}
          keyboardType="numeric"
        />
      </View>
      <Text style={styles.subTitle}>유효기간  |  CVC</Text>
      <View style={{ flexDirection:'row', marginStart: 28, marginBottom: 40, alignItems:'center' }}>
      <TextInput
        style={styles.input2}
        editable={true}
        multiline={false}
        maxLength={2}
        onChangeText={(text) => {
          setCardDueMonth(text)
          onChange(text, expiryYearRef, 2)
        }} 
        keyboardType="numeric"
        placeholder='월'
        ref={expiryMonthRef} // ref 수정
      />
      <Text style={{fontSize:24, fontWeight:'bold', color:'#007bff'}}> /</Text>
      <TextInput
        style={styles.input2}
        editable={true}
        multiline={false}
        maxLength={2}
        onChangeText={(text) => {
          setCardDueYear(text)
          onChange(text, cvcRef, 2)
        }}
        keyboardType="numeric"
        placeholder='연'
        ref={expiryYearRef} // 새로운 연도 입력을 위한 ref
      />
        <Text style={{fontSize:24, fontWeight:'bold', marginHorizontal: 10}}> | </Text>
        <TextInput
          style={styles.input3}
          editable={true}
          multiline={false}
          maxLength={3}
          onChangeText={(text) => {
            setCardCVC(text)
            onChange(text, cardPasswordRef, 3)
          }}
          placeholder="CVC"
          keyboardType="numeric"
          ref={cvcRef}
        />
      </View>
      <Text style={styles.subTitle}>카드비밀번호 앞 2자리</Text>
      <View style={{flexDirection:'row', marginStart: 28, marginBottom: 40, alignItems:'center'}}>
        <TextInput
          style={styles.input2}
          editable={true}
          multiline={false}
          maxLength={2}
          onChangeText={(text) => {
            setCardPassword(text)
            onChange(text, null, 2)
          }} 
          keyboardType="numeric"
          ref={cardPasswordRef}
        />
        <Text style={{fontSize:24, fontWeight:'bold', color:'#007bff'}}>* *</Text>
      </View>
      <Pressable onPress={handleSubmit}>
        <View style={styles.box}>
          <Text style={styles.boxTxt}>결제 카드 추가</Text>
        </View>
      </Pressable>
    </View>
  )
}

export default PayCardEnrollPage

const styles = StyleSheet.create({
  container:{
    backgroundColor:'#ffffff',
    height:'100%'
  },
  backBtn: {
    margin: 12,
    marginTop:32,
  },
  title: {
    marginStart: 20,
    marginBottom: 50,
    fontSize: 28,
    fontWeight:'bold'
  },
  subTitle: {
    marginStart: 28,
    marginBottom: 10,
    fontSize: 20,
    fontWeight:'bold'
  },
  input4:{
    width: 60, // 입력 필드의 너비
    borderBottomWidth: 2, // 하단 테두리 두께
    borderBottomColor: '#007bff', // 하단 테두리 색상
    fontSize: 24, // 글꼴 크기
    fontWeight: 'bold', // 글꼴 두께
    textAlign: 'center', // 텍스트 중앙 정렬
    color: '#007bff', // 입력 텍스트 색상
    marginHorizontal: 10,
  },
  input3:{
    width: 60,
    borderBottomWidth: 2, 
    borderBottomColor: '#007bff', 
    fontSize: 24, 
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#007bff', 
    marginHorizontal: 10,
  },
  input2: {
    width: 40, 
    borderBottomWidth: 2,
    borderBottomColor: '#007bff', 
    fontSize: 24,
    fontWeight: 'bold', 
    textAlign: 'center', 
    color: '#007bff', 
    marginHorizontal: 10,
  },
  box: {
    alignSelf: 'center',
    width: '60%',
    height: 60,
    backgroundColor: '#5087FF',
    borderRadius: 10,
    marginVertical: 30,
  },
  boxTxt: {
    fontSize: 20,
    color:'white',
    textAlign: 'center',
    fontWeight:'bold',
    marginVertical:15,
  }
})