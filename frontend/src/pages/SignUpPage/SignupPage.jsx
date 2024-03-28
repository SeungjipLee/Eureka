import React, { useState, useRef } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, Alert, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import TokenService from '../../stores/TokenUtils';

const SignupPage = () => {

  const navigation = useNavigation();

  const [BorderBottomColor1, setBorderBottomColor1] = useState('lightgray');
  const [BorderBottomColor2, setBorderBottomColor2] = useState('lightgray');
  const [BorderBottomColor3, setBorderBottomColor3] = useState('lightgray');
  const [BorderBottomColor4, setBorderBottomColor4] = useState('lightgray');
  const [BorderBottomColor5, setBorderBottomColor5] = useState('lightgray');

  const [PhoneNum, setPhoneNum] = useState('');
  const [RNum, setRNum] = useState('');
  const [RNum2, setRNum2] = useState('');
  const [Name, setName] = useState('');
  const [PickerValue, setPickerValue] = useState('SKT'); // picker의 선택된 값
  const [AuthNum, setAuthNum] = useState('');

  const phoneNumInputRef = useRef(null);
  const rNumInputRef = useRef(null);
  const rNum2InputRef = useRef(null);
  const nameInputRef = useRef(null);
  const authNumInputRef = useRef(null);

  const [showAuthInput, setShowAuthInput] = useState(false);


  const checkAndShowAuthInput = () => {
    // 휴대폰 번호, 주민등록번호, 이름이 모두 입력되었는지 확인
    if (PhoneNum.length === 11 && RNum.length === 6 && RNum2.length === 1 && Name.length > 0) {
      // 모든 조건이 충족되면 서버에 사용자 정보 전송
      const userInfo = {
        userName: Name,
        userBirth: RNum,
        userGender: RNum2,
        phoneNumber: PhoneNum,
      };

      axios.post('https://j10e101.p.ssafy.io/api/user/send', userInfo)
        .then(response => {
          // 성공적으로 응답을 받았을 때
          Alert.alert('인증번호가 전송되었습니다.', '인증번호를 입력해주세요.');
          setShowAuthInput(true); // 인증번호 입력란을 표시
          setTimeout(() => authNumInputRef.current.focus(), 100);
        })
        .catch(error => {
          // 요청이 실패했을 때
          console.error('인증번호 요청 실패:', error);
          Alert.alert('인증 실패', '인증번호 요청에 실패했습니다.');
        });
    } else {
      // 필수 정보가 충분하지 않다면 사용자에게 알림
      Alert.alert('알림', '필수 정보를 모두 입력해주세요.');
    }
  };

  const resendAuthNumber = () => {
    if (PhoneNum.length === 11 && RNum.length === 6 && RNum2.length === 1 && Name.length > 0) {
      // 모든 조건이 충족되면 서버에 사용자 정보 전송
      const userInfo = {
        userName: Name,
        userBirth: RNum,
        userGender: RNum2,
        phoneNumber: PhoneNum,
      };

      axios.post('https://j10e101.p.ssafy.io/api/user/send', userInfo)
        .then(response => {
          // 성공적으로 응답을 받았을 때
          Alert.alert('인증번호가 재전송되었습니다.', '인증번호를 입력해주세요.');
          setAuthNum(''); // 인증번호 입력칸 초기화
        })
        .catch(error => {
          // 요청이 실패했을 때
          console.error('인증번호 재전송 실패:', error);
          Alert.alert('인증 실패', '인증번호 재전송에 실패했습니다.');
        });
    } else {
      // 필수 정보가 충분하지 않다면 사용자에게 알림
      Alert.alert('알림', '필수 정보를 모두 입력해주세요.');
    }
  };

  const handleConfirm = async () => {
    if (showAuthInput) {
      const verificationInfo = {
        userName: Name,
        userBirth: RNum,
        userGender: RNum2,
        phoneNumber: PhoneNum,
        authNumber: AuthNum,
      };

      try {
        const response = await axios.post('https://j10e101.p.ssafy.io/api/user/check', verificationInfo);
        if (response.status === 200) {
          // response.data에 값이 있는 경우, 즉 accessToken과 refreshToken이 반환된 경우
          if (response.data && response.data.accessToken && response.data.refreshToken) {
            // TokenUtils를 사용하여 accessToken과 refreshToken 저장 및 Routers로 이동
            const { accessToken, refreshToken } = response.data;
            await TokenService.setToken(accessToken, refreshToken);
            navigation.reset({
              index: 0, // 새 스택의 시작 인덱스를 0으로 설정합니다.
              routes: [{ name: 'Routers' }], // 이동할 라우트의 배열을 설정합니다.
            });
            console.log(accessToken)
          } else {
            // response.data가 비어있거나 예상한 값이 없는 경우, 인증 성공 처리
            Alert.alert('인증 성공', '인증이 완료되었습니다.', [
              { text: "확인", onPress: () => navigation.navigate('PasswordPage', { verificationInfo: verificationInfo }) }
            ]);
          }
        }
      } catch (error) {
        console.error('인증 확인 실패:', error);
        Alert.alert('인증 실패', '인증번호 확인에 실패했습니다.', [
          { text: "확인", onPress: () => setAuthNum('') },
        ]);
      }
    } else {
      checkAndShowAuthInput();
    }
  };


  const MiddleView = () => (
    <View
      style={styles.TextInputView}>
      <Text
        style={{
          color: 'lightgray'
        }}>휴대폰 번호</Text>
      <TextInput
        ref={phoneNumInputRef}
        style={styles.TextInput}
        placeholder='-없이 입력해주세요'
        value={PhoneNum}
        maxLength={11}
        keyboardType='numeric'
        onChangeText={value => {
          setPhoneNum(value);
          if (value.length === 11) {
            rNumInputRef.current.focus(); // 전화번호 입력이 완료되면 다음 필드로 자동 이동
          }
        }}
        onFocus={() => {
          setBorderBottomColor1('#3675FF');
        }}
        onEndEditing={() => {
          setBorderBottomColor1('lightgray');
        }}
        returnKeyType="next"
        onSubmitEditing={() => rNumInputRef.current.focus()}
      ></TextInput>
    </View>
  );

  const MiddleView2 = () => (
    <View
      style={styles.TextInputView}>
      <Text
        style={{
          color: 'lightgray'
        }}>
        주민등록 번호
      </Text>
      <View
        style={{
          flexDirection: 'row',
          height: '50%',
          alignItems: 'center',
        }}>
        <TextInput
          ref={rNumInputRef}
          style={styles.TextInput_half}
          placeholder='주민등록 번호'
          value={RNum}
          onChangeText={value => {
            setRNum(value);
            if (value.length === 6) {
              rNum2InputRef.current.focus(); // 전화번호 입력이 완료되면 다음 필드로 자동 이동
            }
          }}
          maxLength={6}
          keyboardType='numeric'
          onFocus={() => {
            setBorderBottomColor2('#3675FF');
          }}
          onEndEditing={() => {
            setBorderBottomColor2('lightgray');
          }}
          returnKeyType="next"
          onSubmitEditing={() => rNum2InputRef.current.focus()}
        />
        <View
          style={{
            width: '10%',
            flexDirection: 'row',
            justifyContent: 'center',
          }}
        >
          <Text style={{ fontSize: 24, fontWeight: '300' }}> - </Text>
        </View>
        <TextInput
          ref={rNum2InputRef}
          style={[
            styles.TextInput_half,
            { width: '8%', borderBottomColor: BorderBottomColor3 },
          ]}
          value={RNum2}
          onChangeText={value => {
            setRNum2(value);
            if (value.length === 1) {
              nameInputRef.current.focus(); // 전화번호 입력이 완료되면 다음 필드로 자동 이동
            }
          }}
          maxLength={1}
          keyboardType='numeric'
          onFocus={() => {
            setBorderBottomColor3('red');
          }}
          onEndEditing={() => {
            setBorderBottomColor3('lightgray');
          }}
          returnKeyType="next"
          onSubmitEditing={() => nameInputRef.current.focus()}
        />
        <TextInput
          style={[
            styles.TextInput_half,
            { borderBottomWidth: 0, width: '37%' },
          ]}
          value="000000"
          secureTextEntry={true}
          editable={false}
        />
      </View>
    </View>
  );

  const MiddleView3 = () => (
    <View
      style={styles.TextInputView}>
      <Text
        style={{
          color: 'lightgray'
        }}>이름</Text>
      <TextInput
        ref={nameInputRef}
        style={[
          styles.TextInput,
          { borderBottomColor: BorderBottomColor4 }
        ]}
        placeholder='홍길동'
        value={Name}
        onChangeText={value => {
          setName(value);
        }}
        onFocus={() => {
          setBorderBottomColor4('#3675FF');
        }}
        onEndEditing={() => {
          setBorderBottomColor4('lightgray');
        }}
        keyboardType='default'
        returnKeyType="done"
      ></TextInput>
    </View>
  );

  const MiddleView4 = () => (
    <View style={styles.TextInputView}>
      <Text style={{ color: 'lightgray' }}>통신사 선택</Text>
      <Picker
        selectedValue={PickerValue}
        onValueChange={(item) => setPickerValue(item)}
      >
        <Picker.Item label="SKT" value="SKT" />
        <Picker.Item label="LGU+" value="LGU+" />
        <Picker.Item label="KT" value="KT" />
      </Picker>
    </View>
  );

  const MiddleView5 = () => (
    <View style={styles.TextInputView}>
      <Text style={{ color: 'lightgray' }}>
        인증번호
      </Text>
      <View style={{ flexDirection: 'row', height: '50%', alignItems: 'center' }}>
        <TextInput
          ref={authNumInputRef}
          style={styles.TextInput_half}
          placeholder='인증 번호'
          value={AuthNum}
          onChangeText={value => { setAuthNum(value); }}
          maxLength={6}
          keyboardType='numeric'
          onFocus={() => { setBorderBottomColor5('#3675FF'); }}
          onEndEditing={() => { setBorderBottomColor5('lightgray'); }}
          returnKeyType="done"
        />
        <View style={{ width: '10%', flexDirection: 'row', justifyContent: 'center' }} />
        {/* TouchableOpacity를 사용한 "인증번호 재전송" 버튼 */}
        <TouchableOpacity
          style={[styles.btn, { flex: 1 }]} // TouchableOpacity 스타일 적용
          onPress={resendAuthNumber}
        >
          <Text style={styles.btnTxt}>인증번호 재전송</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const styles = StyleSheet.create({
    // 기존 스타일은 유지
    btn: {
      marginVertical: 20,
      width: "60%",
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
      alignSelf: 'center'
    },
    input: {
      height: 40,
      margin: 12,
      borderWidth: 1,
      padding: 10,
    },
    TextInputView: {
      width: '100%',
      height: '20%',
      marginTop: '5%',
      display: 'flex',
      justifyContent: 'center',
      // backgroundColor: 'gray',
    },
    TextInput: {
      width: '100%',
      height: '50%',
      backgroundColor: 'white',
      borderBottomColor: BorderBottomColor1,
      borderBottomWidth: 1,
      fontSize: 24,
      fontWeight: '600',
    },
    TextInput_half: {
      width: '45%',
      height: '100%',
      // backgroundColor: 'orange',
      borderBottomColor: BorderBottomColor2,
      borderBottomWidth: 1,
      fontSize: 24,
      fontWeight: '600',
    },
  });

  return (
    <SafeAreaView
      style={{
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
      }}>
      <View
        style={{
          width: '90%',
          height: '100%',
          // backgroundColor: 'red',
          marginLeft: '5%',
        }}>

        <View
          style={{
            width: '100%',
            height: '15%',
            // backgroundColor: 'skyblue',
            display: 'flex',
            justifyContent: 'flex-end'
          }}>
          <Text
            style={{
              fontSize: 24,
              fontWeight: 'bold'
            }}>입력한 정보를 확인해주세요</Text>
        </View>
        <View
          style={{
            width: '100%',
            height: '50%',

          }}>
          {MiddleView()}
          {/* {MiddleView4()} */}
          {MiddleView2()}
          {MiddleView3()}
          {showAuthInput && MiddleView5()}
        </View>
        <View style={{ width: '100%', height: '35%', alignItems: 'center', display: 'flex', justifyContent: 'flex-end' }}>
          {/* TouchableOpacity를 사용한 "확인" 버튼 */}
          <TouchableOpacity style={styles.btn} onPress={handleConfirm}>
            <Text style={styles.btnTxt}>확인</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SignupPage;
