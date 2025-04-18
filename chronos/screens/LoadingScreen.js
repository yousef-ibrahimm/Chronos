import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StudentContext } from "../store/context/student-context";
import { ActivityIndicator, MD2Colors } from "react-native-paper";
import { callStudentsApi } from "../utils/studentsApi";
import { Colors } from "../components/constants/colors";

const LoadingScreen = ({ navigation }) => {
  const studentCtxt = useContext(StudentContext);
  const [studentData, setStudentData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callStudentsApi(studentCtxt.studentId);
        console.log("Student data", response);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [studentCtxt.studentId]);

  // This useEffect will log studentData whenever it changes
  useEffect(() => {
    if (studentData) {
      navigation.navigate("MainScreens", { data: studentData });
    }
  }, [studentData]);

  return (
    <View style={styles.container}>
      <Text style={styles.loadingText}>Fetching Student Data...</Text>
      <ActivityIndicator
        animating={true}
        color={"purple"}
        size={"large"}
        style={styles.activityIndicator}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.backgroundColour,
    padding: 16,
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textColourDark, // Subtle text color
    marginBottom: 20,
    textAlign: "center",
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default LoadingScreen;
