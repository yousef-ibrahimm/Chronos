import React, { useContext } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { Chip } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import { StudentContext } from "../store/context/student-context";
import { Colors } from "../components/constants/colors";

const SignInScreen = ({ navigation }) => {
  const studentCtxt = useContext(StudentContext);

  function navigateToHome() {
    navigation.navigate("Loading");
  }

  const setId = (id) => {
    studentCtxt.setId(id);
  };

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-dark.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Chronos</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <TextInput
        onChangeText={(e) => setId(e)}
        style={styles.input}
        placeholder="Enter your ID"
        placeholderTextColor="#6B7280" // Muted gray for placeholder
        mode="outlined"
        keyboardType="numeric" // Accept numbers only
      />
      <Chip
        title={"Sign In"}
        onPress={navigateToHome}
        buttonStyle={styles.chip}
        titleStyle={styles.chipText}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start", // Align components to the top
    alignItems: "center",
    backgroundColor: Colors.backgroundColour, // Light modern background color
    padding: 16,
    paddingTop: 75, // Add padding to move components down slightly
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textColourDark, // Dark modern text color
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18, // Slightly larger font size for better readability
    fontWeight: "400", // Normal weight for a clean look
    color: Colors.textColourDark, // A darker muted gray for better contrast
    marginBottom: 24,
    textAlign: "center", // Center-align the subtitle for a balanced layout
    lineHeight: 24, // Add line height for better spacing
  },
  input: {
    width: "85%",
    marginVertical: 10,
    backgroundColor: "#FFFFFF", // White background for input
    borderRadius: 8, // Rounded corners for modern input
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB", // Light gray border for input
    color: "#1F2937", // Text color inside input
  },
  chip: {
    marginTop: 16,
    backgroundColor: Colors.accent, // Modern blue for the button
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  chipText: {
    color: "#FFFFFF", // White text for contrast
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SignInScreen;
