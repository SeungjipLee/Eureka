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


// import React from 'react';
// import { StyleSheet, View } from 'react-native';
// import AuthPage from './src/pages/AuthPage/AuthPage';  

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <AuthPage></AuthPage>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });