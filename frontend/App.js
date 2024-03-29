import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/stores/store';
import { Provider } from 'react-redux';
import AuthRouters from './src/routers/AuthRouters';
import { SafeAreaProvider } from 'react-native-safe-area-context'; // SafeAreaProvider 임포트

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <StatusBar style="auto" />
          <AuthRouters />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
}
