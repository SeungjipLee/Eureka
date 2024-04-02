import React, { useState, createRef } from 'react';
import { StyleSheet, Text, View, Pressable, TextInput, Alert, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TokenService from '../../../stores/TokenUtils';
import axios from 'axios';

const SignupPasswordChangeConfirm = ({ navigation, route }) => {
  const { password: postpassword } = route.params;
  const initialRefs = Array(6).fill().map(() => createRef());
  const [inputValues, setInputValues] = useState(Array(6).fill(''));
  const [activeInputIndex, setActiveInputIndex] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [buttonBackgrounds, setButtonBackgrounds] = useState(Array(12).fill('#3675FF'));

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // 비밀번호 일치 확인 및 변경 요청 함수
  // 비밀번호 일치 확인 및 변경 요청 함수
  const updatePassword = async (newPassword) => {
    try {
      const accessToken = await TokenService.getAccessToken(); // 토큰 가져오기

      const response = await axios.put('https://j10e101.p.ssafy.io/api/auth/user', { password: newPassword }, { // newPassword를 객체 형태로 전달 수정
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      if (response.status === 200) {
        await TokenService.setPassword(newPassword);
        Alert.alert("성공", "비밀번호가 변경되었습니다.", [{ text: '확인', onPress: () => navigation.navigate('Routers') }]);
      } else {
        throw new Error('비밀번호 변경 실패');
      }
    } catch (error) {
      console.error('비밀번호 변경 오류:', error);
      Alert.alert("오류", "비밀번호 변경 과정에서 오류가 발생했습니다.");
      setInputValues(Array(6).fill('')); // 오류 발생 시 비밀번호 칸 초기화 추가
      setActiveInputIndex(0); // 첫 번째 입력 칸으로 커서 이동 추가
    }
  };

  // 현재 입력 필드를 확인하는 함수
  const checkPasswordMatch = (currentPassword) => {
    if (currentPassword === postpassword) {
      updatePassword(currentPassword);
    } else {
      Alert.alert("오류", "비밀번호가 일치하지 않습니다.", [{ text: '확인' }]);
      setInputValues(Array(6).fill(''));
      setActiveInputIndex(0);
    }
  };

  const handleInputChange = (text, index) => {
    const newInputValues = [...inputValues];
    newInputValues[index] = text;
    setInputValues(newInputValues);

    if (text && index < 5) {
      setActiveInputIndex(index + 1);
      initialRefs[index + 1].current.focus();
    } else if (!text && index > 0) {
      setActiveInputIndex(index - 1);
      initialRefs[index - 1].current.focus();
    }
  };

  const handleNumberPadPress = (button, index) => {
    let newInputValues = [...inputValues];

    if (button === '삭제') {
      if (inputValues[activeInputIndex] === '' && activeInputIndex > 0) {
        newInputValues[activeInputIndex - 1] = '';
        setActiveInputIndex(activeInputIndex - 1);
      } else {
        newInputValues[activeInputIndex] = '';
      }
    } else {
      newInputValues[activeInputIndex] = button.toString();
      if (activeInputIndex < 5) {
        setActiveInputIndex(activeInputIndex + 1);
      }
    }

    setInputValues(newInputValues);

    if (newInputValues.every((value) => value !== '') && newInputValues.length === 6) {
      checkPasswordMatch(newInputValues.join(''));
    }

    // 버튼 배경색 업데이트 로직
    const updatedBackgrounds = [...buttonBackgrounds];
    updatedBackgrounds[index] = 'rgba(255,255,255, 0.7)'; // 하얀색으로 변경
    setButtonBackgrounds(updatedBackgrounds);

    setTimeout(() => {
      const resetBackgrounds = [...buttonBackgrounds];
      resetBackgrounds[index] = '#3675FF'; // 원래 색상으로 복원
      setButtonBackgrounds(resetBackgrounds);
    }, 50);
  };

  const renderNumberPad = () => {
    const buttons = [
      1, 2, 3,
      4, 5, 6,
      7, 8, 9,
      '공백', 0, '삭제'
    ];

    return (
      <View style={styles.numberPadContainer}>
        {buttons.map((button, index) => (
          <Pressable
            key={index}
            style={[styles.numberPadButton, { backgroundColor: buttonBackgrounds[index] }]}
            onPress={() => button !== '공백' && handleNumberPadPress(button, index)}>
            <Text style={styles.numberPadText}>{button !== '공백' ? button : ''}</Text>
          </Pressable>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.topBar}>
        <Pressable style={styles.pressable} onPress={() => navigation.goBack()}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="white" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>비밀번호 확인</Text>
        </View>
      </View>
      <View style={styles.passwordContainer}>
        <View style={styles.promptContainer}>
          <Text style={styles.prompt}>비밀번호 확인</Text>
        </View>
        <View style={styles.inputContainer}>
          {inputValues.map((value, index) => (
            <TextInput
              key={index}
              ref={initialRefs[index]}
              style={[
                styles.input,
                { backgroundColor: value ? 'white' : 'gray' }, // 입력 값의 유무에 따른 배경색 설정
                showPassword && value ? { color: 'black', backgroundColor: 'transparent' } : { color: 'transparent' }, // 비밀번호 보기 활성화 및 입력 값이 있는 경우 텍스트 색상을 검정으로 변경
              ]}
              maxLength={1}
              onChangeText={(text) => handleInputChange(text, index)}
              value={value}
              editable={index === activeInputIndex}
              selectionColor={'transparent'}
            />
          ))}
        </View>
        <TouchableOpacity style={styles.toggleButton} onPress={togglePasswordVisibility}>
          <Text style={styles.toggleButtonText}>비밀번호 보기</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomContainer}>
        {renderNumberPad()}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    backgroundColor: '#3675FF',
  },
  topBar: {
    width: '100%',
    height: '10%',
    flexDirection: 'row',
    paddingTop: '2%'
  },
  // 나머지 상단 바 스타일
  pressable: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    // 아이콘 스타일은 이미 완성된 상태입니다.
  },
  titleContainer: {
    width: '80%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',

  },
  passwordContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '35%',
    paddingTop: '10%',
  },
  promptContainer: {
    marginBottom: 20,
  },
  prompt: {
    fontSize: 30,
    color: 'white',
    fontWeight: '600',
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  input: {
    width: 40,
    height: 40,
    borderRadius: 20,
    textAlign: 'center',
    fontSize: 40,
    backgroundColor: 'white',
    marginHorizontal: '1%',
    color: 'transparent'
  },
  inputVisible: {
    backgroundColor: 'transparent', // 배경색 투명
    color: 'black', // 텍스트 색상 검정
  },
  bottomContainer: {
    width: '100%',
    height: '55%',
    justifyContent: 'center',
    paddingBottom: 20,
  },
  numberPadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginHorizontal: 10,
  },
  numberPadButton: {
    width: 110,
    height: 90,
    margin: 5,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blankButton: {
    backgroundColor: 'transparent',
  },
  numberPadText: {
    fontSize: 30,
    color: 'white'
  },
  toggleButton: {
    marginTop: 20,
    backgroundColor: 'rgba(128, 128, 128, 0.7)',
    width: '35%',
    height: '13%',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10
  },
  toggleButtonText: {
    fontSize: 24,
    color: 'rgba(255, 255, 255, 0.8)',
  }
});

export default SignupPasswordChangeConfirm;
