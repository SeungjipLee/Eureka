import * as SecureStore from 'expo-secure-store'

const StorageKeys = {
  AccessToken: 'accessToken',
  RefreshToken: 'refreshToken',
  UserData: 'userData',
  SelectedImageUri: 'selectedImageUri',
  Password: 'password',
};

const TokenService = {
  // 토큰 저장
  setToken: async (accessToken, refreshToken) => {
    try {
      await SecureStore.setItemAsync(StorageKeys.AccessToken, accessToken);
      await SecureStore.setItemAsync(StorageKeys.RefreshToken, refreshToken);
    } catch (error) {
      console.error('SecureStore에 토큰 저장 실패', error);
    }
  },

  // 액세스 토큰 조회
  getAccessToken: async () => {
    try {
      return await SecureStore.getItemAsync(StorageKeys.AccessToken);
    } catch (error) {
      console.error('SecureStore에서 액세스 토큰 조회 실패', error);
      return null;
    }
  },

  // 리프레시 토큰 조회
  getRefreshToken: async () => {
    try {
      return await SecureStore.getItemAsync(StorageKeys.RefreshToken);
    } catch (error) {
      console.error('SecureStore에서 리프레시 토큰 조회 실패', error);
      return null;
    }
  },

  // 사용자 정보 저장
  setUserData: async (userData) => {
    try {
      const userDataString = JSON.stringify(userData);
      await SecureStore.setItemAsync(StorageKeys.UserData, userDataString);
    } catch (error) {
      console.error('SecureStore에 사용자 정보 저장 실패', error);
    }
  },

  // 사용자 정보 조회
  getUserData: async () => {
    try {
      const userDataString = await SecureStore.getItemAsync(StorageKeys.UserData);
      return userDataString ? JSON.parse(userDataString) : null;
    } catch (error) {
      console.error('SecureStore에서 사용자 정보 조회 실패', error);
      return null;
    }
  },

  setSelectedImageUri: async (imageUri) => {
    try {
      await SecureStore.setItemAsync(StorageKeys.SelectedImageUri, imageUri);
    } catch (error) {
      console.error('SecureStore에 이미지 URI 저장 실패', error);
    }
  },

  getSelectedImageUri: async () => {
    try {
      return await SecureStore.getItemAsync(StorageKeys.SelectedImageUri);
    } catch (error) {
      console.error('SecureStore에서 이미지 URI 조회 실패', error);
      return null;
    }
  },

  // 패스워드 저장
  setPassword: async (password) => {
    try {
      await SecureStore.setItemAsync(StorageKeys.Password, password);
    } catch (error) {
      console.error('SecureStore에 패스워드 저장 실패', error);
    }
  },

  // 패스워드 조회
  getPassword: async () => {
    try {
      return await SecureStore.getItemAsync(StorageKeys.Password);
    } catch (error) {
      console.error('SecureStore에서 패스워드 조회 실패', error);
      return null;
    }
  },

  // 모든 정보 삭제 (토큰 및 사용자 정보)
  clearAllData: async () => {
    try {
      await SecureStore.deleteItemAsync(StorageKeys.AccessToken);
      await SecureStore.deleteItemAsync(StorageKeys.RefreshToken);
      await SecureStore.deleteItemAsync(StorageKeys.UserData);
      await SecureStore.deleteItemAsync(StorageKeys.SelectedImageUri);
      // await SecureStore.deleteItemAsync(StorageKeys.Password);
    } catch (error) {
      console.error('SecureStore에서 모든 데이터 삭제 실패', error);
    }
  },
};


export default TokenService;
