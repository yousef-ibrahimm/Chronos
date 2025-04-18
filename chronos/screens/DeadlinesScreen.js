import { View, Text, StyleSheet, FlatList } from "react-native";
import { StudentContext } from "../store/context/student-context";
import { useContext } from "react";
import GeneralWrapper from "../components/UI/GeneralWrapper";
import { Colors } from "../components/constants/colors";

const DeadlinesScreen = ({ navigation }) => {
  const studentCtxt = useContext(StudentContext);
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
    paddingTop: 75,
    flex: 1,
    backgroundColor: Colors.backgroundColour,
    padding: 16,
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#555", // Subtle text color
    textAlign: "center", // Center the text
    marginTop: 20,
  },
});

export default DeadlinesScreen;
