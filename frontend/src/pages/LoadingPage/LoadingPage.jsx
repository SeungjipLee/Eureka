import React, { useEffect } from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import TokenUtils from "../../stores/TokenUtils";

const LoadingScreen = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkToken = async () => {
      try {
        // 3초간 로딩 화면 유지
        await new Promise(resolve => setTimeout(resolve, 2000));

        const accessToken = await TokenUtils.getAccessToken('accessToken');
        const refreshToken = await TokenUtils.getRefreshToken('refreshToken'); // refreshToken 확인 추가

        if (accessToken || refreshToken) {
          // AccessToken 또는 RefreshToken이 있으면 Routers로 이동
          navigation.replace('Routers');
        } else {
          // 둘 다 없으면 SplashPage로 이동
          navigation.replace('SplashPage');
        }
      } catch (e) {
        // 토큰 확인 과정에서 오류 발생
        console.error('토큰 확인 실패', e);
        // 오류 처리 로직 추가 가능
      }
    };

    checkToken();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.loadingContainer}>
        <Image
          source={require('../../../assets/loading.png')}
          style={styles.loadingImage}
          resizeMode="contain"
        />
      </View>
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
    height: Dimensions.get('window').height,
    marginBottom: 20,
  }
});

export default LoadingScreen;
