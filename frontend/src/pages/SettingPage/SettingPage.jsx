import React from 'react';
import { StyleSheet, ScrollView, TouchableOpacity, Text, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TokenService from '../../stores/TokenUtils';


function SettingPage() {
  const navigation = useNavigation();

  const handleLogout = () => {
    // 로그아웃 확인 다이얼로그 표시
    Alert.alert(
      "로그아웃", // 다이얼로그 제목
      "로그아웃 하시겠습니까?", // 다이얼로그 메시지
      [
        {
          text: "취소",
          onPress: () => { }, // 취소 버튼 클릭 시 아무것도 하지 않음
          style: "cancel",
        },
        { text: "확인", onPress: () => logout() } // 확인 버튼 클릭 시 logout 함수 실행
      ],
      { cancelable: false } // 안드로이드에서 바깥쪽 클릭으로 닫히지 않도록 함
    );
  };

  // 로그아웃 로직을 별도의 함수로 분리
  const logout = async () => {
    try {
      await TokenService.clearAllTokens(); // 모든 토큰을 삭제합니다.
      navigation.navigate('SplashPage'); // SplashPage로 이동합니다.
    } catch (error) {
      Alert.alert("로그아웃 실패", "로그아웃 중 문제가 발생했습니다."); // 오류가 발생하면 사용자에게 알립니다.
    }
  };

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('VerifyPasswordChange')}>
        <Text style={styles.buttonText}>비밀번호 변경</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={{ padding: 10, backgroundColor: 'blue', borderRadius: 5, textAlign: 'center'}}>
        <Text style={{ color: 'white' }}>로그아웃</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    marginVertical: 40,
    marginHorizontal: 10,
    flex: 1,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  // 기존 스타일들...
  icon: {
    marginBottom: 10,
  },
  paycard: {
    marginBottom: 10,
  },
  monthly: {
    marginBottom: 10,
  },
  onlypay: {
    marginBottom: 10,
    height: 100,
  },
  foryou: {
    minHeight: 140,
  },
});
