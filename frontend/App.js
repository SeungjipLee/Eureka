import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import Routers from './src/routers/Routers';

export default function App() {
  return (
    <NavigationContainer>
      <StatusBar />
      <Routers />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  
});
