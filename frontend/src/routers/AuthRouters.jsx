import { createStackNavigator } from "@react-navigation/stack";
import SignupPage from '../pages/SignUpPage/SignupPage'
import PasswordPage from '../pages/SignUpPage/PasswordPage'
import PasswordConfirmPage from '../pages/SignUpPage/PasswordConfirmPage'
import Routers from "./Routers";
import LoadingPage from "../pages/LoadingPage/LoadingPage"
import SplashPage from "../pages/LoadingPage/SplashPage";
import ConfirmLoading from "../pages/SettingPage/components/ConfirmLoading";



function AuthenticationRouter () {
  const AuthStack = createStackNavigator()
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="LoadingPage" component={LoadingPage}/>
      <AuthStack.Screen name="SignupPage" component={SignupPage}/>
      <AuthStack.Screen name="PasswordPage" component={PasswordPage}/>
      <AuthStack.Screen name="PasswordConfirmPage" component={PasswordConfirmPage}/>
      <AuthStack.Screen name='SplashPage' component={SplashPage}/>
      <AuthStack.Screen name='CheckModal' component={ConfirmLoading}/>
      <AuthStack.Screen name='Routers' component={Routers}/>
    </AuthStack.Navigator>
  )
}

export default AuthenticationRouter