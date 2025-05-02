import { StyleSheet, Text, View } from "react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import MainScreens from "./screens/MainScreens";
import HomeScreen from "./screens/HomeScreen";
import ModulesScreen from "./screens/ModulesScreen";
import SignInScreen from "./screens/SignInScreen";
import StudentContextProvider from "./store/context/student-context";
import LoadingScreen from "./screens/LoadingScreen";
import AssessmentsScreen from "./screens/AssessmentsScreen";
import GoogleSignIn from "./utils/GoogleSignIn";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <StudentContextProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="MainScreens" component={MainScreens} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Modules" component={ModulesScreen} />
          <Stack.Screen name="Loading" component={LoadingScreen} />
          <Stack.Screen
            name="Assessments"
            component={AssessmentsScreen}
            options={{
              headerShown: true,
              headerTitle: " ",
            }}
          />
          <Stack.Screen name="Google" component={GoogleSignIn} />
        </Stack.Navigator>
      </NavigationContainer>
    </StudentContextProvider>
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
