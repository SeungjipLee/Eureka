import { createStackNavigator } from "@react-navigation/stack";
import CardDetailPage from "../pages/CardPage/CardDetailPage";
import CardDetailPayPage from "../pages/CardPage/CardDetailPayPage";
import PayCardEnrollPage from "../pages/CardPage/PayCardEnrollPage";
import OwnCardEnrollPage from "../pages/CardPage/OwnCardEnrollPage";
import OwnCardPage from "../pages/CardPage/OwnCardPage";



function CardRouters () {
  const HomeStack = createStackNavigator()
  return (
    <HomeStack.Navigator
      screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="CardHome" component={OwnCardPage}/>
      <HomeStack.Screen name="CardDetail" component={CardDetailPage}/>
      <HomeStack.Screen name="CardDetailPay" component={CardDetailPayPage}/>
      <HomeStack.Screen name="PayCardEnroll" component={PayCardEnrollPage}/>
      <HomeStack.Screen name="OwnCardEnroll" component={OwnCardEnrollPage}/>
    </HomeStack.Navigator>
  )
}

export default CardRouters