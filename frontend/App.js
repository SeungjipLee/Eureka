import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './src/routers/Routers';
import { store } from './src/stores/store';
import { Provider } from 'react-redux'

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar />
        <Routers />
      </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  
});
