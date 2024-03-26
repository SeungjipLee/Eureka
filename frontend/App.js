import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/stores/store';
import { Provider } from 'react-redux'
import AuthRouters from './src/routers/AuthRouters'


export default function App () {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <StatusBar />
        <AuthRouters />
      </NavigationContainer>
    </Provider>
  );
}