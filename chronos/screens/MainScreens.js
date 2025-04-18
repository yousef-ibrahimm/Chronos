import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons"; // Import icons for tab bar
import HomeScreen from "./HomeScreen";
import DeadlinesScreen from "./DeadlinesScreen";
import { StudentContext } from "../store/context/student-context";

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
        headerShown: false, // Remove the title at the top
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline";
          } else if (route.name === "Deadlines") {
            iconName = focused ? "calendar" : "calendar-outline";
          }

          // Return the appropriate icon
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#FFFFFF", // White for active tab icons/text
        tabBarInactiveTintColor: "#BB86FC", // Light purple for inactive tab icons/text
        tabBarStyle: {
          backgroundColor: "#6200EE", // Modern purple color for the tab bar
          paddingBottom: 5, // Add some padding for better appearance
          height: 60, // Adjust height for better usability
        },
        tabBarLabelStyle: {
          fontSize: 12, // Adjust font size for labels
          fontWeight: "bold", // Make labels bold
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Deadlines" component={DeadlinesScreen} />
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
