import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../store/context/student-context";
import { Avatar } from "react-native-paper";
import { callApi } from "../utils/moduleApi";
import { Colors } from "../components/constants/colors";

const HomeScreen = () => {
  const studentCtxt = useContext(StudentContext);
  const modules = studentCtxt.modules.split(",");
  const [moduleData, setModuleData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newModuleData = [];
        for (const module of modules) {
          const response = await callApi("Module Code", module);
          newModuleData.push(response[0].data);
        }
        setModuleData(newModuleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [studentCtxt.studentId]);

  useEffect(() => {
    if (moduleData.length > 0) {
      studentCtxt.setModuleData(moduleData);
    }
  }, [moduleData]);

  console.log("Module data", moduleData);

  const getStudentInitials = (fullName) => {
    const nameParts = fullName.split(" ");
    const initials =
      nameParts.length >= 2
        ? nameParts[0][0].toUpperCase() +
          nameParts[nameParts.length - 1][0].toUpperCase()
        : nameParts[0][0].toUpperCase();
    return initials;
  };

  function findClosestAssessment(data) {
    const today = new Date();
    let closestAssessment = null;
    let smallestDiff = Infinity;

    data.flat(2).forEach((assessment) => {
      const assessmentDate = new Date(assessment["Assessment Date"]);
      const diff = Math.abs(assessmentDate - today);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestAssessment = assessment;
      }
    });
    return closestAssessment;
  }

  console.log("Closest assessment", findClosestAssessment(moduleData));
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Avatar.Text
          size={50}
          label={getStudentInitials(studentCtxt.studentName)}
        />
      </View>
      <View style={styles.nextDeadlineContainer}>
        <Text style={styles.text}>Hi {studentCtxt.studentName}</Text>
        <Text style={styles.text}>{studentCtxt.courseName}</Text>
      </View>
      <View style={styles.nextDeadlineContainer}>
        <Text style={styles.title}>Next Deadline</Text>
        <View style={styles.nextDeadline}>
          <Text style={styles.innerTxt}>
            <Text style={styles.bold}>Module:</Text>{" "}
            {findClosestAssessment(moduleData)?.["Module Name"] || "Loading..."}
          </Text>
          <Text style={styles.innerTxt}>
            <Text style={styles.bold}>Assessment:</Text>{" "}
            {findClosestAssessment(moduleData)?.["Method of Assessment"] ||
              "Loading..."}
          </Text>
          <Text style={styles.innerTxt}>
            <Text style={styles.bold}>Due in:</Text>{" "}
            {(() => {
              const assessmentDate =
                findClosestAssessment(moduleData)?.["Assessment Date"];
              if (assessmentDate) {
                const today = new Date();
                const date = new Date(assessmentDate);
                const diffTime = date - today;
                const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
                return diffDays > 0 ? `${diffDays} days` : "Due today!";
              }
              return "N/A";
            })()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    backgroundColor: Colors.backgroundColour,
  },
  text: {
    fontSize: 18,
    color: "#555", // Subtle text color
    marginBottom: 16,
  },
  moduleContainer: {
    marginTop: 16,
    padding: 12,
    borderWidth: 1,
    borderColor: "#ddd", // Light border color
    borderRadius: 12, // Rounded corners
    width: "100%",
    backgroundColor: Colors.containerBackgroundColour, // White card-like background
  },
  moduleText: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8,
  },
  avatarContainer: {
    marginBottom: 16,
    alignSelf: "center", // Center the avatar
  },
  studentInfoContainer: {
    marginBottom: 16,
    alignItems: "center", // Center the text horizontally
  },
  nextDeadlineContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 12,
    elevation: 3, // Subtle shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: "90%",
  },
  title: {
    fontSize: 22,
    fontWeight: "600",
    color: "#222", // Darker title color
    marginBottom: 12,
  },
  nextDeadline: {
    marginTop: 8,
  },
  innerTxt: {
    fontSize: 16,
    color: "#444", // Neutral text color
    marginBottom: 12,
    lineHeight: 22, // Better readability
  },
  bold: {
    fontWeight: "700", // Stronger emphasis
    color: Colors.textColourDark, // Black for bold text
  },
});

export default HomeScreen;
