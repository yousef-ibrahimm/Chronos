import React, { createRef, useContext, useRef, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { Chip, Input } from "@rneui/themed";
import { TextInput } from "react-native-paper";
import { StudentContext } from "../store/context/student-context";

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
      <TextInput onChangeText={(e) => setId(e)} style={styles.input} />
      <Chip
        title={"Sign in"}
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
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9", // Light background for a modern look
    padding: 16,
  },
  text: {
    fontSize: 24,
    fontWeight: "600",
    color: "#222", // Darker text color for emphasis
    marginBottom: 16,
  },
  input: {
    width: "80%",
    marginVertical: 10,
    backgroundColor: "#fff", // White background for input
    borderRadius: 8, // Rounded corners for modern input
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#ddd", // Light border for input
  },
  chip: {
    marginTop: 16,
    backgroundColor: "#6200ee", // Modern purple color for the button
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  chipText: {
    color: "#fff", // White text for contrast
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SignInScreen;
