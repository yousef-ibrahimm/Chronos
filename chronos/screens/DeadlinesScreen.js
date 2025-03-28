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
          data={studentCtxt.moduleData}
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
    marginTop: 50,
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
});

export default DeadlinesScreen;
