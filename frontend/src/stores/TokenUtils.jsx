import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageKeys = {
  AccessToken: 'accessToken',
  RefreshToken: 'refreshToken',
};

const TokenService = {
  // 토큰 저장
  setToken: async (accessToken, refreshToken) => {
    try {
      await AsyncStorage.setItem(StorageKeys.AccessToken, accessToken);
      await AsyncStorage.setItem(StorageKeys.RefreshToken, refreshToken);
    } catch (error) {
      console.error('AsyncStorage에 토큰 저장 실패', error);
    }
  },

  // 액세스 토큰 조회
  getAccessToken: async () => {
    try {
      return await AsyncStorage.getItem(StorageKeys.AccessToken);
    } catch (error) {
      console.error('AsyncStorage에서 액세스 토큰 조회 실패', error);
      return null;
    }
  },

  // 리프레시 토큰 조회
  getRefreshToken: async () => {
    try {
      return await AsyncStorage.getItem(StorageKeys.RefreshToken);
    } catch (error) {
      console.error('AsyncStorage에서 리프레시 토큰 조회 실패', error);
      return null;
    }
  },

  // 모든 토큰 삭제
  clearAllTokens: async () => {
    try {
      await AsyncStorage.removeItem(StorageKeys.AccessToken);
      await AsyncStorage.removeItem(StorageKeys.RefreshToken);
    } catch (error) {
      console.error('AsyncStorage에서 토큰 삭제 실패', error);
    }
  },
};

export default TokenService;
