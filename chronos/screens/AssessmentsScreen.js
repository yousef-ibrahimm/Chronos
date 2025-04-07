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
    backgroundColor: "#f9f9f9", // Light background for a clean look
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#222", // Darker title color for emphasis
    marginBottom: 16,
  },
  assessmentContainer: {
    backgroundColor: "#fff", // White card-like background
    padding: 16,
    marginVertical: 8,
    borderRadius: 12, // Rounded corners for a modern look
    elevation: 3, // Subtle shadow for Android
    shadowColor: "#000", // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    width: "90%",
  },
  innerTxt: {
    fontSize: 16,
    color: "#444", // Neutral text color
    marginBottom: 8,
    lineHeight: 22, // Better readability
  },
  bold: {
    fontWeight: "700", // Stronger emphasis for labels
    color: "#000", // Black for bold text
  },
});

export default AssessmentsScreen;
