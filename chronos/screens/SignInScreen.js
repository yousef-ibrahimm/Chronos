import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Chip } from "@rneui/themed";

const SignInScreen = ({ navigation }) => {
  function navigateToHome() {
    navigation.navigate("MainScreens");
  }

  return (
    <View style={styles.container}>
      <Chip title={"Sign in"} onPress={navigateToHome} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
  },
});

export default SignInScreen;
