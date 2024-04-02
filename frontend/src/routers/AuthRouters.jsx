import { createStackNavigator } from "@react-navigation/stack";
import SignupPage from '../pages/SignUpPage/SignupPage'
import PasswordPage from '../pages/SignUpPage/PasswordPage'
import PasswordConfirmPage from '../pages/SignUpPage/PasswordConfirmPage'
import Routers from "./Routers";
import LoadingPage from "../pages/LoadingPage/LoadingPage"
import SplashPage from "../pages/LoadingPage/SplashPage";
import ConfirmLoading from "../pages/SettingPage/components/ConfirmLoading";
import PasswordChange from "../pages/SettingPage/components/PasswordChange";
import PasswordChangeConfirm from "../pages/SettingPage/components/PasswordChangeConfirm";
import VerifyPasswordChange from "../pages/SettingPage/components/VerifyPasswordChange";
import SignupPasswordChange from "../pages/SignUpPage/components/SignupPasswordChange";
import SignupPasswordChangeConfirm from "../pages/SignUpPage/components/SignupPasswordChangeConfirm";
import PaymentPassword from "../pages/SettingPage/components/PaymentPassword";


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
      <AuthStack.Screen name="VerifyPasswordChange" component={VerifyPasswordChange}/>
      <AuthStack.Screen name="PasswordChange" component={PasswordChange}/>
      <AuthStack.Screen name="PasswordChangeConfirm" component={PasswordChangeConfirm}/>
      <AuthStack.Screen name='SignupPasswordChange' component={SignupPasswordChange}/>
      <AuthStack.Screen name='SignupPasswordChangeConfirm' component={SignupPasswordChangeConfirm}/>
      <AuthStack.Screen name='PaymentPassword' component={PaymentPassword}/>
      <AuthStack.Screen name='Routers' component={Routers}/>
    </AuthStack.Navigator>
  )
}

export default AuthenticationRouter