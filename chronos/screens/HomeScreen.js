import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../store/context/student-context";
import { callApi } from "../utils/moduleApi";

const HomeScreen = () => {
  const studentCtxt = useContext(StudentContext);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{studentCtxt.studentId}</Text>
      <Text style={styles.text}>{studentCtxt.studentName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
