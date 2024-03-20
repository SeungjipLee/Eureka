import { createStackNavigator } from "@react-navigation/stack";
import OwnCardPage from "../pages/CardPage/OwnCardPage";
import PayCardPage from "../pages/CardPage/PayCardPage";
import CardDetailPage from "../pages/CardPage/CardDetailPage";
import CardDetailPayPage from "../pages/CardPage/CardDetailPayPage";
import PayCardEnrollPage from "../pages/CardPage/PayCardEnrollPage";
import OwnCardEnrollPage from "../pages/CardPage/OwnCardEnrollPage";



function CardRouters () {
  const HomeStack = createStackNavigator()
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="OwnCard" component={OwnCardPage}/>
      <HomeStack.Screen name="PayCard" component={PayCardPage}/>
      <HomeStack.Screen name="CardDetail" component={CardDetailPage}/>
      <HomeStack.Screen name="CardDetailPay" component={CardDetailPayPage}/>
      <HomeStack.Screen name="PayCardEnroll" component={PayCardEnrollPage}/>
      <HomeStack.Screen name="OwnCardEnroll" component={OwnCardEnrollPage}/>
    </HomeStack.Navigator>
  )
}

export default CardRouters