import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import Papa from "papaparse";
import { StudentContext } from "../store/context/student-context";

const HomeScreen = () => {
  const [studentData, setStudentData] = useState([]);
  const studentCtxt = useContext(StudentContext);

  useEffect(() => {
    const fetchParseData = async () => {
      const response = await fetch("../resources/ids.csv");
      const csvText = await response.text();
      Papa.parse(csvText, {
        delimiter: ",",
        complete: (result) => {
          setStudentData(result.data);
        },
      });
    };
    fetchParseData();
  }, []);

  useEffect(() => {
    const findStudentData = (studentId) => {
      if (studentData.length === 0) {
        return [];
      }
      return studentData.find((student) => student[0] === studentId);
    };

    const studentInfo = findStudentData(studentCtxt.studentId);
    studentCtxt.setCourse(studentInfo ? studentInfo[2] : null);
    studentCtxt.setName(studentInfo ? studentInfo[1] : null);
    studentCtxt.setModules(studentInfo ? studentInfo.slice(4) : []);
  }, [studentData, studentCtxt]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{studentCtxt.studentId}</Text>
      <Text style={styles.text}>{studentCtxt.courseId}</Text>
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
