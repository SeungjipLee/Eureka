import { createStackNavigator } from "@react-navigation/stack";
import CardDetailPage from "../pages/CardPage/CardDetailPage";
import CardDetailPayPage from "../pages/CardPage/CardDetailPayPage";
import PayCardEnrollPage from "../pages/CardPage/PayCardEnrollPage";
import OwnCardEnrollPage from "../pages/CardPage/OwnCardEnrollPage";
import OwnCardPage from "../pages/CardPage/OwnCardPage";



function CardRouters () {
  const CardStack = createStackNavigator()
  return (
    <CardStack.Navigator
      screenOptions={{ headerShown: false }}>
      <CardStack.Screen name="CardHome" component={OwnCardPage}/>
      <CardStack.Screen name="CardDetail" component={CardDetailPage}/>
      <CardStack.Screen name="CardDetailPay" component={CardDetailPayPage}/>
      <CardStack.Screen name="PayCardEnroll" component={PayCardEnrollPage}/>
      <CardStack.Screen name="OwnCardEnroll" component={OwnCardEnrollPage}/>
    </CardStack.Navigator>
  )
}

export default CardRouters     