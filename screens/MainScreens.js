import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import icons for tab bar
import HomeScreen from "./HomeScreen";
import { StudentContext } from "../store/context/student-context";
import ModulesScreen from "./ModulesScreen";

const Tab = createBottomTabNavigator();

const MainScreens = ({ route }) => {
  const data = route.params.data;
  const studentCtxt = useContext(StudentContext);

  studentCtxt.setName(data[0]["Name"]);
  studentCtxt.setModules(data[0]["Modules"]);
  studentCtxt.setCourseNameCx(data[0]["Course"]);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Modules") {
            iconName = focused ? "book" : "book-outline";
          }

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#BB86FC",
        tabBarStyle: {
          backgroundColor: "#6200EE",
          paddingBottom: 5,
          height: 60,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: "bold",
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Modules" component={ModulesScreen} />
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default MainScreens;
