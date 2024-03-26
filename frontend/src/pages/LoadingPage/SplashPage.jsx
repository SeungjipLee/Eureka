import React from 'react';
import { View, Image, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SplashPage = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Image
          source={require('../../../assets/SplashPage.png')}
          style={styles.loadingImage}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={styles.startButton}
        onPress={() => navigation.navigate('SignupPage')} // SignupPage로 이동
      >
        <Text style={styles.startButtonText}>시작하기</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
  },
  loadingImage: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height * 0.8, // 이미지 크기 조정
  },
  startButton: {
    backgroundColor: '#007AFF', // 버튼 배경색
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20, // 버튼 모서리 둥글게
    marginTop: 20, // 이미지와 버튼 사이의 간격
  },
  startButtonText: {
    color: 'white', // 텍스트 색상
    fontSize: 20, // 텍스트 크기
  }
});

export default SplashPage;
