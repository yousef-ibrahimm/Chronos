import React, { useContext, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import HomeScreen from "./HomeScreen";
import DeadlinesScreen from "./DeadlinesScreen";
import { StudentContext } from "../store/context/student-context";

const Tab = createMaterialBottomTabNavigator();

const MainScreens = ({ route }) => {
  const data = route.params.data;
  const studentCtxt = useContext(StudentContext);

  studentCtxt.setName(data[0]["Name"]);
  studentCtxt.setModules(data[0]["Modules"]);
  studentCtxt.setCourseNameCx(data[0]["Course"]);
  return (
    <Tab.Navigator>
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
