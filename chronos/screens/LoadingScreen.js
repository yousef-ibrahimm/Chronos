import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { StudentContext } from "../store/context/student-context";
import { callStudentsApi } from "../utils/studentsApi";

const LoadingScreen = ({ navigation }) => {
  const studentCtxt = useContext(StudentContext);
  const [studentData, setStudentData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await callStudentsApi(studentCtxt.studentId);
        setStudentData(response.data);
        console.log("Student data", response);
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
      <Text>Fetching Student Data...</Text>
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
});

export default LoadingScreen;
