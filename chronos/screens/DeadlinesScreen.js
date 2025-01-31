import { View, Text, StyleSheet, FlatList } from "react-native";
import { StudentContext } from "../store/context/student-context";
import { useContext, useEffect, useState } from "react";
import Papa from "papaparse";
import GeneralWrapper from "../components/UI/GeneralWrapper";

const DeadlinesScreen = () => {
  const studentCtxt = useContext(StudentContext);

  console.log(studentCtxt.moduleData);

  const renderDeadlines = (module) => {
    return <GeneralWrapper moduleData={module} />;
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
