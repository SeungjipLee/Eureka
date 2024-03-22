import React, { useRef, useState } from 'react'
import { StyleSheet, Text, View, Pressable, TextInput } from "react-native"
import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

function PayCardEnrollPage() {
  const navigation = useNavigation()
  // TextInput 참조를 위한 Refs 생성
  const input2Ref = useRef();
  const input3Ref = useRef();
  const input4Ref = useRef();
  const expiryMonthRef = useRef(); // 유효기간 월 입력을 위한 ref
  const expiryYearRef = useRef(); // 유효기간 연도 입력을 위한 ref
  const cvcRef = useRef();
  const cardPasswordRef = useRef();

  const onChange = (text, nextInput, maxLength) => {
    if (text.length === maxLength && nextInput) {
      nextInput.current.focus();
    }
  };

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
          onChangeText={text => onChange(text, input2Ref, 4)}
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
          onChangeText={text => onChange(text, input3Ref, 4)}
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
          onChangeText={text => onChange(text, input4Ref, 4)}
          ref={input3Ref}
          keyboardType="numeric"
          secureTextEntry={true} // 마찬가지로, 가리기 원치 않을 경우 false
          returnKeyType="next"
          blurOnSubmit={false}
        />
        <Text style={styles.dash}>-</Text>
        <TextInput
          style={styles.input4}
          editable={true}
          multiline={false}
          maxLength={4}
          onChangeText={text => onChange(text, expiryMonthRef, 4)} // 마지막 카드번호 입력 후 유효기간으로 이동
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
        onChangeText={(text) => onChange(text, expiryYearRef, 2)} // 월 입력 후 연도 입력으로 넘어가게 수정
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
        onChangeText={(text) => onChange(text, cvcRef, 2)} // 연도 입력 후 CVC로 넘어가게 수정
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
          onChangeText={(text) => onChange(text, cardPasswordRef, 3)} // maxLength를 3으로  설정하여 CVC 입력 후 카드 비밀번호로 이동
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
          onChangeText={(text) => onChange(text, null, 2)} // 마지막 필드이므로 다음 입력   필드 없음
          keyboardType="numeric"
          ref={cardPasswordRef}
        />
        <Text style={{fontSize:24, fontWeight:'bold', color:'#007bff'}}>* *</Text>
      </View>
      <View style={styles.box}>
        <Text style={styles.boxTxt}>결제 카드 추가</Text>
      </View>
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