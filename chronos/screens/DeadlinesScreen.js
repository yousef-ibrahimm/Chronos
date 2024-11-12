import { View, Text, StyleSheet, FlatList } from "react-native";
import { StudentContext } from "../store/context/student-context";
import { useContext, useEffect, useState } from "react";
import Papa from "papaparse";
import GeneralWrapper from "../components/UI/GeneralWrapper";

const DeadlinesScreen = () => {
  const studentCtxt = useContext(StudentContext);
  const [courseDeadlines, setCourseDeadlines] = useState([]);

  useEffect(() => {
    const fetchParseCSV = async () => {
      try {
        const response = await fetch("../resources/master.csv");
        const csvText = await response.text();

        Papa.parse(csvText, {
          header: true,
          complete: (result) => {
            const jsonData = result.data;
            setCourseDeadlines(jsonData);
          },
        });
      } catch (error) {
        console.error("Error fetching or parsing CSV file:", error);
      }
    };

    fetchParseCSV();
  }, []);

  useEffect(() => {
    if (courseDeadlines.length > 0) {
      const studentModules = studentCtxt.modules;
      studentCtxt.setCourseDeadlinesCx(
        addStudentModulesDeadlines(studentModules)
      );
    }
  }, [courseDeadlines]);

  function addStudentModulesDeadlines(moduleIds) {
    let moduleDeadlines = [];
    moduleIds.forEach((moduleId) => {
      const moduleDeadline = courseDeadlines.filter(
        (deadline) => deadline["Module Code"] === moduleId
      );
      moduleDeadlines.push(moduleDeadline);
    });

    return moduleDeadlines;
  }

  const renderDeadlines = (module) => {
    return <GeneralWrapper moduleData={module} />;
  };
  return (
    <View style={styles.container}>
      {courseDeadlines.length > 0 ? (
        <FlatList
          data={studentCtxt.courseDeadlines}
          renderItem={renderDeadlines}
          keyExtractor={() => Math.random * 1000}
        />
      ) : (
        <Text style={styles.text}>Loading deadlines...</Text>
      )}
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
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DeadlinesScreen;
