import { View, Text, StyleSheet } from "react-native";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../store/context/student-context";
import { callApi } from "../utils/moduleApi";

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
          newModuleData.push(response[0].data[0]);
          console.log(newModuleData);
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

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Student ID: {studentCtxt.studentId}</Text>
      <Text style={styles.text}>Student Name: {studentCtxt.studentName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  text: {
    fontSize: 24,
    marginBottom: 16,
  },
  moduleContainer: {
    marginTop: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    width: "100%",
  },
  moduleText: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default HomeScreen;
