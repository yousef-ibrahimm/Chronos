import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AssessmentsScreen = ({ route }) => {
  const items = route.params.moduleData.item;

  // Define the specific properties to display
  const allowedKeys = [
    "Assessment Date",
    "Method of Assessment",
    "Weight",
    "Credits",
    "Length",
    "Module Coordinator",
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Assessments Screen</Text>
      {items.map((moduleItem, index) => {
        // Filter only the allowed keys for the current item
        const filteredDetails = allowedKeys.map((key) => ({
          key,
          value: moduleItem[key],
        }));

        return (
          <View key={index} style={styles.assessmentContainer}>
            {filteredDetails.map((detail, detailIndex) => (
              <Text key={detailIndex} style={styles.innerTxt}>
                <Text style={styles.bold}>{detail.key}:</Text> {detail.value}
              </Text>
            ))}
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 16,
  },
  assessmentContainer: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 2, // Shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    width: "90%", // Adjust width to fit the screen
  },
  innerTxt: {
    fontSize: 16,
    color: "#333",
    marginBottom: 8, // Add spacing between details
  },
  bold: {
    fontWeight: "bold",
  },
});

export default AssessmentsScreen;
