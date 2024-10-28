import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreens from "./screens/MainScreens";
import HomeScreen from "./screens/HomeScreen";
import DeadlinesScreen from "./screens/DeadlinesScreen";
import SignInScreen from "./screens/SignInScreen";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="MainScreens" component={MainScreens} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Deadlines" component={DeadlinesScreen} />
        <Stack.Screen name="SignIn" component={SignInScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
