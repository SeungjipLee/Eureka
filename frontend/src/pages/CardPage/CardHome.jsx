import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
import PayCardPage from './PayCardPage'
import OwnCardPage2 from './OwnCardPage2'

function CardHome () {
  const Tab = createMaterialTopTabNavigator()
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: { fontSize: 16, fontWeight: 'bold' }
      }}
    >
      <Tab.Screen name="보유 카드" component={OwnCardPage2} />
      <Tab.Screen name="결제 카드" component={PayCardPage} />
    </Tab.Navigator>
  )
}

export default CardHome