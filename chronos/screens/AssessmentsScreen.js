import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const AssessmentsScreen = ({ route }) => {
  const item = route.params.moduleData.item;
  // Define the specific properties to display
  const allowedKeys = [
    "Assessment Date",
    "Method of Assessment",
    "Weight",
    "Credits",
    "Length",
    "Module Coordinator",
  ];

  // Filter only the allowed keys for all items
  const filteredDetails = item
    .map((moduleItem) =>
      allowedKeys.map((key) => ({
        key,
        value: moduleItem[key],
      }))
    )
    .flat();

  const renderModuleData = ({ item }) => (
    <View>
      <Text style={styles.innerTxt}>
        <Text style={styles.bold}>{item.key}:</Text> {item.value}
      </Text>
    </View>
  );

  console.log(filteredDetails);
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assessments Screen</Text>
      <View style={styles.innerContainer}>
        <FlatList
          data={filteredDetails}
          renderItem={renderModuleData}
          keyExtractor={(item) => item.key}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default AssessmentsScreen;
