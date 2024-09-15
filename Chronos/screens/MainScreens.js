import { Text, View } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import ModulesScreen from "./ModulesScreen";
import CustomisationScreen from "./CustomisationScreen";

const Tab = createMaterialBottomTabNavigator();
const MainScreens = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Modules" component={ModulesScreen} />
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Customisation" component={CustomisationScreen} />
    </Tab.Navigator>
  );
};

export default MainScreens;
