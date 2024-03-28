import { createStackNavigator } from "@react-navigation/stack";
import ProductPage from "../pages/ProductPage/ProductPage";
import ByCard from "../pages/ProductPage/components/ByCard";
import ByCategory from "../pages/ProductPage/components/ByCategory";
import CompareCard from "../pages/ProductPage/components/CompareCard";
import CurrentBenefitMore from "../pages/ProductPage/components/CurrentBenefitMore";
import FitYourConsumption from "../pages/ProductPage/components/FitYourConsumption";
import SelectCardInfo from "../pages/ProductPage/components/SelectCardInfo";
import CardList from "../pages/ProductPage/components/ByCardComponent/CardList";

const ProductStack = createStackNavigator();

function ProductRouters() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen name="ProductPage1" component={ProductPage} />
      <ProductStack.Screen name="ByCard" component={ByCard} />
      <ProductStack.Screen name="ByCategory" component={ByCategory} />
      <ProductStack.Screen name="CompareCard" component={CompareCard} />
      <ProductStack.Screen
        name="CurrentBenefitMore"
        component={CurrentBenefitMore}
      />
      <ProductStack.Screen
        name="FitYourConsumption"
        component={FitYourConsumption}
      />
      <ProductStack.Screen name="SelectCardInfo" component={SelectCardInfo} />
    </ProductStack.Navigator>
  );
}

export default ProductRouters;
