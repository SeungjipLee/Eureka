import { createStackNavigator } from "@react-navigation/stack";
import QRScanPage from "../pages/QRScanPage"
import PasswordPage from '../pages/SignUpPage/PasswordPage'



function AuthenticationRouter () {
  const AuthStack = createStackNavigator()
  return (
    <AuthStack.Navigator
      screenOptions={{ headerShown: false }}>
      <AuthStack.Screen name="QRScanPage" component={QRScanPage}/>
      <AuthStack.Screen name="PasswordPage" component={PasswordPage}/>
    </AuthStack.Navigator>
  )
}

export default AuthenticationRouter