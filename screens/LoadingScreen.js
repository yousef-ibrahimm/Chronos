import React, { useContext, useEffect, useState } from "react";
import { View, Text, StyleSheet, Image } from "react-native";
import { StudentContext } from "../store/context/student-context";
import { ActivityIndicator } from "react-native-paper";
import { callStudentsApi } from "../utils/studentsApi";
import { Colors } from "../components/constants/colors";

const LoadingScreen = ({ navigation }) => {
  const studentCtxt = useContext(StudentContext);
  const [studentData, setStudentData] = useState();
  const [errorMessage, setErrorMessage] = useState(null);

  const extractStudentId = (email) => {
    const match = email.match(/up(\d+)@/);
    return match ? match[1] : null;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const email = studentCtxt.googleInfo.email;

        // Validate email domain
        if (!email.endsWith("@myport.ac.uk")) {
          setErrorMessage(
            "Invalid email. Please use an @myport.ac.uk email address."
          );
          return;
        }

        const studentId = extractStudentId(email);
        if (!studentId) {
          setErrorMessage("Unable to extract student ID from email.");
          return;
        }

        const response = await callStudentsApi(studentId);
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setErrorMessage(
          "Failed to fetch student data. Please try again or contact IT support."
        );
      }
    };

    fetchData();
  }, [studentCtxt.studentId]);

  useEffect(() => {
    if (studentData) {
      navigation.navigate("MainScreens", { data: studentData });
    }
  }, [studentData]);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-dark.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      {errorMessage ? (
        <Text style={styles.errorText}>{errorMessage}</Text>
      ) : (
        <>
          <Text style={styles.loadingText}>Fetching Student Data...</Text>
          <ActivityIndicator
            animating={true}
            color={"purple"}
            size={"large"}
            style={styles.activityIndicator}
          />
        </>
      )}
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
  logo: {
    width: 150,
    height: 150,
    marginBottom: 24, // Adds spacing below the logo
  },
  loadingText: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.textColourDark,
    marginBottom: 20,
    textAlign: "center",
  },
  errorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "red",
    textAlign: "center",
  },
  activityIndicator: {
    marginTop: 20,
  },
});

export default LoadingScreen;
