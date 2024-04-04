import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, View, Pressable, Image, Switch, Linking } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TokenService from '../../stores/TokenUtils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';
import SettingService from '../../stores/SettingUtils';


function SettingPage() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [userBirth, setUserBirth] = useState('');
  const [userPhoneNumber, setUserPhoneNumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isBiometricEnabled, setIsBiometricEnabled] = useState(null);

  const formatBirth = (birth) => {
    // 생년월일 형식: YYYYMMDD
    const year = birth.substring(0, 4);
    const month = birth.substring(4, 6);
    const day = birth.substring(6);

    return `${year}. ${month}. ${day}`;
  };

  const formatPhoneNumber = (phoneNumber) => {
    // 전화번호 형식: XXXXXXXXXX (10자리 또는 11자리)
    const part1 = phoneNumber.substring(0, 3);
    const part2 = phoneNumber.substring(3, 7);
    const part3 = phoneNumber.substring(7);

    return `${part1}-${part2}-${part3}`;
  };


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
      navigation.reset({
        index: 0, // 초기화 후의 스택 인덱스를 지정합니다. 0은 스택의 첫 번째 페이지를 의미합니다.
        routes: [{ name: 'SplashPage' }], // 이동할 경로의 배열을 지정합니다. 이 경우 SplashPage가 스택의 첫 번째이자 유일한 페이지가 됩니다.
      });

    } catch (error) {
      Alert.alert("로그아웃 실패", "로그아웃 중 문제가 발생했습니다."); // 오류가 발생하면 사용자에게 알립니다.
    }
  };

  const toggleBiometricEnabled = async () => {
    const newValue = !isBiometricEnabled;

    // newValue가 true일 때
    if (newValue === true) {
      // 바로 비밀번호 변경 화면으로 이동
      navigation.navigate('VerifyPasswordChange', {
        button: 'bio',
        newValue: newValue // 여기서 newValue를 전달
      });
    } else {
      // newValue가 false일 때 생체 인식 사용 설정을 false로 저장
      await SettingService.setBiometricEnabled(newValue.toString());
      setIsBiometricEnabled(newValue); // UI 상태 업데이트
    }
  };


  useEffect(() => {
    // 사용자 데이터 불러오기
    const fetchUserData = async () => {
      const userData = await TokenService.getUserData();
      if (userData && userData.userName && userData.userBirth && userData.phoneNumber) {
        setUserName(userData.userName);
        setUserBirth(userData.userBirth);
        setUserPhoneNumber(userData.phoneNumber);
      }
    };

    // 선택된 이미지 URI 불러오기
    const fetchSelectedImageUri = async () => {
      const uri = await TokenService.getSelectedImageUri();
      if (uri) {
        setSelectedImage(uri);
      }
    };

    // 생체 인식 사용 설정 불러오기
    const loadBiometricPreference = async () => {
      const isEnabled = await SettingService.getBiometricEnabled();
      // 문자열 "true"나 "false"를 실제 boolean 값으로 변환
      const isEnabledBool = isEnabled === 'true';
      setIsBiometricEnabled(isEnabledBool);
    };

    // 모든 데이터를 비동기적으로 불러오기
    const initializeData = async () => {
      await Promise.all([
        fetchUserData(),
        fetchSelectedImageUri(),
        loadBiometricPreference(),
      ]);
    };

    initializeData();

    const unsubscribe = navigation.addListener('focus', () => {
      // 화면이 포커스 될 때 호출될 함수
      initializeData();
    });

    // 컴포넌트가 언마운트될 때 리스너 제거
    return unsubscribe;
  }, [navigation]);


  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert(
        '권한 요청',
        '사진 라이브러리에 접근하기 위해 권한이 필요합니다. 설정에서 권한을 허용해주세요.',
        [
          { text: '나중에하기', onPress: () => { } },
          { text: '설정으로 이동', onPress: () => Linking.openSettings() }, // 사용자가 설정으로 이동하여 권한을 직접 변경할 수 있도록 합니다.
        ],
        { cancelable: false },
      );
      return false;
    }
    return true;
  };
  const pickImage = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri); // 상태 업데이트
      TokenService.setSelectedImageUri(result.assets[0].uri); // AsyncStorage에 저장
    }
  };


  return (
    <SafeAreaView style={styles.safeAreaView}>
      <View style={styles.topBar}>
        <Pressable onPress={() => navigation.goBack()} style={styles.pressable}>
          <MaterialCommunityIcons name="chevron-left" size={50} color="black" />
        </Pressable>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>설정</Text>
        </View>
      </View>
      <View style={styles.middleContainer}>
        <View style={styles.imageContainer}>
          <TouchableOpacity onPress={pickImage}>
            {selectedImage ? (
              <Image source={{ uri: selectedImage }} style={styles.profileImage} />
            ) : (
              <Image source={require('../../../assets/profileDefault.png')} style={styles.profileImage} />
            )}
            <MaterialCommunityIcons name="close-circle" size={30} color="black" style={styles.crossIcon} />
          </TouchableOpacity>
        </View>
        <View style={styles.profileContainer}>
          <View style={styles.profileData}>
            <Text style={styles.profileTitle}>이름</Text>
            <Text style={styles.profileVlue}>{userName}</Text>
          </View>
          <View style={styles.profileData}>
            <Text style={styles.profileTitle}>나이</Text>
            <Text style={styles.profileVlue}>{formatBirth(userBirth)}</Text>
          </View>
          <View style={styles.profileData}>
            <Text style={styles.profileTitle}>전화번호</Text>
            <Text style={styles.profileVlue}>{formatPhoneNumber(userPhoneNumber)}</Text>
          </View>
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <View style={styles.switchContainer}>
          <Text style={[styles.buttonText, {paddingLeft: 20}]}>생체 인식 사용</Text>
          <Switch
            style={[{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3}] }]}
            trackColor={{ false: "#767577", true: "white" }}
            thumbColor={isBiometricEnabled ? "#f5dd4b" : "rgb(247,250,255)"} rufwp
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleBiometricEnabled}
            value={isBiometricEnabled}
          />
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('VerifyPasswordChange', { button: 'passwordchange' })}>
          <Text style={styles.buttonText}>결제 비밀번호 변경</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleLogout} style={styles.button}>
          <Text style={styles.buttonText}>로그아웃</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView >
  );
}

export default SettingPage;

const styles = StyleSheet.create({
  safeAreaView: {
    width: '100%',
    height: '100%',
  },
  topBar: {
    width: '100%',
    height: '10%',
    paddingTop: '2%',
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
  middleContainer: {
    width: '90%',
    height: '45%',
    marginLeft: '5%',
    borderWidth: 2,
    borderRadius: 20,
    borderColor: '#D7D7D7',
    shadowColor: '#D7D7D7',
  },
  imageContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: '#b0b0b0',
    borderBottomWidth: 2,
    shadowColor: '#b0b0b0',
    position: 'relative',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,0.7)',
    borderWidth: 2,
  },
  crossIcon: {
    position: 'absolute',
    left: 85,
    top: 80,
    transform: [{ rotate: '45deg' }],
  },
  profileContainer: {
    width: '100%',
    height: '60%',
    padding: 10,
    // backgroundColor:'blue',
  },
  profileData: {
    width: '100%',
    height: '30%',
    flexDirection: 'row',
    // backgroundColor: 'orange'
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileTitle: {
    flex: 1,
    // textAlign: 'left',
    fontSize: 20,
    paddingLeft: 10,
    fontWeight: '600'
  },
  profileVlue: {
    flex: 3,
    textAlign: 'right',
    fontSize: 20,
    paddingRight: 10,
    fontWeight: '600'
  },
  bottomContainer: {
    width: '100%',
    height: '45%',
    paddingTop: '5%',
  },
  switchContainer: {
    flexDirection:'row',
    justifyContent : 'space-between',
    paddingHorizontal: 30,
    alignItems: 'center',
    width: '90%',
    height: '20%',
    marginTop: '5%',
    marginLeft: '5%',
    backgroundColor: '#4D85FF',
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3, 
    shadowRadius: 4.65, 
    elevation: 8,
  },
  
  button: {
    width: '90%',
    height: '18%',
    backgroundColor: '#4D85FF',
    marginTop: '5%',
    marginLeft: '5%',
    borderRadius: 10,
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  buttonText: {
    fontSize: 20,
    color: 'white',
    textAlign: 'center',
    fontWeight: '700'
  },
});