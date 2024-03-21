import { createStackNavigator } from "@react-navigation/stack";
import MyAkaList from "../pages/StatisticsPage/components/MyAkaList";
import AkaOfYou from "../pages/StatisticsPage/components/AkaOfYou";
import StatisticsPage from "../pages/StatisticsPage/StatisticsPage";

const StatisticsStack = createStackNavigator();

function StatisticsRouters() {
  return (
    <StatisticsStack.Navigator screenOptions={{ headerShown: false }}>
      <StatisticsStack.Screen
        name="StatisticsPage"
        component={StatisticsPage}
      />
      <StatisticsStack.Screen name="AkaOfYou" component={AkaOfYou} />
      <StatisticsStack.Screen name="MyAkaList" component={MyAkaList} />
    </StatisticsStack.Navigator>
  );
}

export default StatisticsRouters;
