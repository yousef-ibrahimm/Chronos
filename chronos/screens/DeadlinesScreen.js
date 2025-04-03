import { View, Text, StyleSheet, FlatList } from "react-native";
import { StudentContext } from "../store/context/student-context";
import { useContext } from "react";
import GeneralWrapper from "../components/UI/GeneralWrapper";

const DeadlinesScreen = ({ navigation }) => {
  const studentCtxt = useContext(StudentContext);
  console.log(studentCtxt.moduleData);

  const renderDeadlines = (module) => {
    function navigateToAssessments() {
      navigation.navigate("Assessments", { moduleData: module });
    }
    return (
      <GeneralWrapper moduleData={module} onPress={navigateToAssessments} />
    );
  };
  return (
    <View style={styles.container}>
      {studentCtxt.moduleData.length > 0 ? (
        <FlatList
          style={{ flex: 1 }} // Ensure it takes up the full space
          data={studentCtxt.moduleData}
          renderItem={renderDeadlines}
          keyExtractor={(item, index) => index.toString()} // Use index or a unique property
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
    marginTop: 50, // Keep this if needed
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DeadlinesScreen;
