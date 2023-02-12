import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../screens/Home";
import { Meal } from "../screens/Meal";
import { Statistics } from "../screens/Statistics";

const { Navigator, Screen } = createNativeStackNavigator();

export function AppRoutes() {
  return (
    <Navigator screenOptions={{ headerShown: false }} initialRouteName="home">
      <Screen name="home" component={Home} />
      <Screen name="meal" component={Meal} />
      <Screen name="statistics" component={Statistics} />
    </Navigator>
  );
}
