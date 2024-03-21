import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { store } from './src/stores/store';
import { Provider } from 'react-redux'
import Routers from './src/routers/Routers'


export default function App () {
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