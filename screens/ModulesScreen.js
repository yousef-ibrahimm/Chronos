import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { StudentContext } from "../store/context/student-context";
import { useContext } from "react";
import GeneralWrapper from "../components/UI/GeneralWrapper";
import { Colors } from "../components/constants/colors";

const ModulesScreen = ({ navigation }) => {
  const studentCtxt = useContext(StudentContext);
  const renderDeadlines = (module) => {
    function navigateToAssessments() {
      navigation.navigate("Assessments", { moduleData: module.item });
    }
    return (
      <GeneralWrapper moduleData={module} onPress={navigateToAssessments} />
    );
  };
  return (
    <View style={styles.container}>
      {studentCtxt.moduleData.length > 0 ? (
        <FlatList
          style={{ flex: 1 }}
          data={studentCtxt.moduleData}
          renderItem={renderDeadlines}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={Colors.primaryColour} />
          <Text style={styles.text}>Loading Modules...</Text>
        </View>
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.textColourDark,
    textAlign: "center",
    marginTop: 20,
  },
});

export default ModulesScreen;
