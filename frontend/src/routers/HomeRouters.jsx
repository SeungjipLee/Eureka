import { createStackNavigator } from "@react-navigation/stack";
import HomePage from "../pages/HomePage/HomePage";
import OnlyPay from "../pages/HomePage/OnlyPay";
import Compare from "../pages/HomePage/Compare";
import SettingPage from "../pages/SettingPage/SettingPage";


function HomeRouters () {
  const HomeStack = createStackNavigator()
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomePage}/>
      <HomeStack.Screen name="OnlyPay" component={OnlyPay}/>
      <HomeStack.Screen name="Compare" component={Compare}/>
      <HomeStack.Screen name="SettingPage" component={SettingPage}/>
    </HomeStack.Navigator>
  )
}

export default HomeRouters