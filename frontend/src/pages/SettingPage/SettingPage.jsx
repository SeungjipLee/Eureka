import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TokenService from '../../stores/TokenUtils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';


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
      await TokenService.clearAllData(); // 모든 토큰을 삭제합니다.
      navigation.navigate('SplashPage'); // SplashPage로 이동합니다.
    } catch (error) {
      Alert.alert("로그아웃 실패", "로그아웃 중 문제가 발생했습니다."); // 오류가 발생하면 사용자에게 알립니다.
    }
  };

  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.pressable}>
          <MaterialCommunityIcons name="chevron-left" size={40} color="black" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>설정</Text>
        </View>
      </View>
      <View style={styles.profileContainer}>
        <View style={{ width: '100%', height: '50%', justifyContent:'center', alignItems:'center'}}>
          <Text style={{backgroundColor:'red'}}>이미지</Text>
        </View>
        <View style={{ width: '100%', height: '50%', justifyContent:'center', alignItems:'center'}}>
          <Text>이름</Text>
          <Text>내 정보 수정하기</Text>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('VerifyPasswordChange')}>
          <Text style={styles.buttonText}>결제 비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

export default SettingPage;

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
    // backgroundColor: '#F7F7F7',
    // backgroundColor: '#3675FF',
  },
  topBar: {
    width: '100%',
    height: '10%',
    marginTop: '2%',
    flexDirection: 'row',
  },
  pressable: {
    width: '10%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleContainer: {
    width: '80%',
    height: '100%',
    paddingLeft: '5%',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  profileContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '95%',
    height: '40%',
    marginLeft: ' 2.5%',
    borderWidth: 2,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    shadowColor: '#D7D7D7',
    backgroundColor: '#ffffff'
  },
  bottomContainer: {
    width: '100%',
    height: '55%',
    paddingBottom: 20,
  },
  button: {
    width: '95%',
    height: '10%',
    backgroundColor: '#007AFF',
    marginTop: '5%',
    marginLeft: '2.5%',
    borderRadius: 10,
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
  },
});
