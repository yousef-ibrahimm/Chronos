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
  input: {
    width: "80%",
    marginVertical: 10,
  },
});

export default SignInScreen;
