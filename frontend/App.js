// // import { StatusBar } from 'expo-status-bar';
// // import { StyleSheet, Text, View } from 'react-native';
// // import { NavigationContainer } from '@react-navigation/native';
// // import Routers from './src/routers/Routers';

// // export default function App() {
// //   return (
// //     <NavigationContainer>
// //       <StatusBar />
// //       <Routers />
// //     </NavigationContainer>
// //   );
// // }

// // const styles = StyleSheet.create({

// // });


import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoadingScreen from './src/pages/LoadingPage/LoadingScreen';
import HomePage from './src/pages/HomePage/HomePage'

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoadingScreen" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
        <Stack.Screen name="HomePage" component={HomePage} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;