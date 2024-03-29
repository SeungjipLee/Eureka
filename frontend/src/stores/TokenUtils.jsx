import AsyncStorage from '@react-native-async-storage/async-storage';

const StorageKeys = {
  AccessToken: 'accessToken',
  RefreshToken: 'refreshToken',
  UserData: 'userData',
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

  // 사용자 정보 저장
  setUserData: async (userData) => {
    try {
      const userDataString = JSON.stringify(userData);
      await AsyncStorage.setItem(StorageKeys.UserData, userDataString);
    } catch (error) {
      console.error('AsyncStorage에 사용자 정보 저장 실패', error);
    }
  },

  // 사용자 정보 조회
  getUserData: async () => {
    try {
      const userDataString = await AsyncStorage.getItem(StorageKeys.UserData);
      return userDataString ? JSON.parse(userDataString) : null;
    } catch (error) {
      console.error('AsyncStorage에서 사용자 정보 조회 실패', error);
      return null;
    }
  },

  // 모든 정보 삭제 (토큰 및 사용자 정보)
  clearAllData: async () => {
    try {
      await AsyncStorage.removeItem(StorageKeys.AccessToken);
      await AsyncStorage.removeItem(StorageKeys.RefreshToken);
      await AsyncStorage.removeItem(StorageKeys.UserData); // 사용자 정보도 삭제
    } catch (error) {
      console.error('AsyncStorage에서 모든 데이터 삭제 실패', error);
    }
  },
};

export default TokenService;
