import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, View, Pressable, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TokenService from '../../stores/TokenUtils';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import * as ImagePicker from 'expo-image-picker';


function SettingPage() {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [userbirth, setuserbirth] = useState('');
  const [userphonenumber, setuserphonenumber] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);

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

  useEffect(() => {
    const fetchUserData = async () => {
      const userData = await TokenService.getUserData();
      if (userData && userData.userName && userData.userBirth && userData.phoneNumber) {
        setUsername(userData.userName);
        setuserbirth(userData.userBirth);
        setuserphonenumber(userData.phoneNumber);
      }
    };
    fetchUserData();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.uri); // 이미지 선택 후 상태 업데이트
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
            <Text style={styles.profileVlue}>{username}</Text>
          </View>
          <View style={styles.profileData}>
            <Text style={styles.profileTitle}>나이</Text>
            <Text style={styles.profileVlue}>{userbirth}</Text>
          </View>
          <View style={styles.profileData}>
            <Text style={styles.profileTitle}>전화번호</Text>
            <Text style={styles.profileVlue}>{userphonenumber}</Text>
          </View>
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
        <TouchableOpacity onPress={() => navigation.navigate('ConfirmLoading')} style={styles.button}>
          <Text style={styles.buttonText}>로딩</Text>
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
    width: '95%',
    height: '45%',
    marginLeft: ' 2.5%',
    borderWidth: 2,
    borderColor: '#D7D7D7',
    borderRadius: 20,
    shadowColor: '#D7D7D7',
  },
  imageContainer: {
    width: '100%',
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomColor: 'black',
    borderBottomWidth: 2,
    position: 'relative',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center'
  },
  crossIcon: {
    position: 'absolute',
    right: 0,
    top: 100,
    transform: [{ rotate: '45deg' }],
  },
  profileContainer: {
    width: '100%',
    height: '60%',
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
    fontSize: 24,
  },
  profileVlue: {
    flex: 3,
    textAlign: 'right',
    fontSize: 24
  },
  bottomContainer: {
    width: '100%',
    height: '45%',
    paddingTop: '5%',
  },
  button: {
    width: '95%',
    height: '15%',
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
