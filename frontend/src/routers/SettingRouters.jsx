import { createStackNavigator } from "@react-navigation/stack";
import SettingPage from "../pages/SettingPage/SettingPage";
import VerifyPasswordChange from "../pages/SettingPage/components/VerifyPasswordChange";
import PasswordChange from "../pages/SettingPage/components/PasswordChange";
import PasswordChangeConfirm from "../pages/SettingPage/components/PasswordChangeConfirm";
import ConfirmLoading from "../pages/SettingPage/components/ConfirmLoading";


function SettingRouters () {
  const AuthStack = createStackNavigator()
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="SettingPage" component={SettingPage}/>
      <AuthStack.Screen name="VerifyPasswordChange" component={VerifyPasswordChange}/>
      <AuthStack.Screen name="PasswordChange" component={PasswordChange}/>
      <AuthStack.Screen name="PasswordChangeConfirm" component={PasswordChangeConfirm}/>
      <AuthStack.Screen name="ConfirmLoading" component={ConfirmLoading}/>
    </AuthStack.Navigator>
  )
}

export default SettingRouters