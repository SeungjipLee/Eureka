import { createStackNavigator } from "@react-navigation/stack";
import ProductPage from "../pages/ProductPage/ProductPage";
import ByCard from "../pages/ProductPage/components/ByCard";
import ByCategory from "../pages/ProductPage/components/ByCategory";

const ProductStack = createStackNavigator();

function ProductRouters() {
  return (
    <ProductStack.Navigator screenOptions={{ headerShown: false }}>
      <ProductStack.Screen name="ProductPage1" component={ProductPage} />
      <ProductStack.Screen name="ByCard" component={ByCard} />
      <ProductStack.Screen name="ByCategory" component={ByCategory} />
    </ProductStack.Navigator>
  );
}

export default ProductRouters;
