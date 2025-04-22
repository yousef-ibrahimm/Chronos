import React from "react";
import { View, Text, StyleSheet, Linking } from "react-native";
import { Colors } from "../components/constants/colors";
import { Button } from "react-native-paper";

const AssessmentsScreen = ({ route }) => {
  const items = route.params.moduleData;

  const formatDateForCalendar = (date) => {
    const isoString = new Date(date).toISOString();
    return isoString.replace(/[-:]/g, "").split(".")[0] + "Z";
  };

  const exportToCalendar = (moduleItem) => {
    const title = `Assessment for ${moduleItem["Module Name"]}`;
    const description = `Details: ${moduleItem["Method of Assessment"]} worth ${
      moduleItem["Weight"] * 100
    }%, Length ${moduleItem["Length"]}, Due on ${
      moduleItem["Assessment Date"]
    }`;
    const startDate = formatDateForCalendar(new Date());
    const endDate = formatDateForCalendar(moduleItem["Assessment Date"]);

    const baseUrl =
      "https://calendar.google.com/calendar/render?action=TEMPLATE";
    const url = `${baseUrl}&text=${encodeURIComponent(
      title
    )}&details=${encodeURIComponent(
      description
    )}&dates=${startDate}/${endDate}`;

    Linking.openURL(url);
  };

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
      <Text style={styles.title}>{items[0]["Module Name"]}</Text>
      {items.map((moduleItem, index) => {
        const filteredDetails = allowedKeys.map((key) => ({
          key,
          value: moduleItem[key],
        }));

        return (
          <View key={index} style={styles.assessmentContainer}>
            <View style={styles.headerContainer}>
              <Text style={styles.moduleTitle}>Assessment {index + 1}</Text>
              <Button
                mode="contained"
                onPress={() => exportToCalendar(moduleItem)}
                style={{ backgroundColor: Colors.primary }}
              >
                Add to Calendar
              </Button>
            </View>
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
    backgroundColor: Colors.backgroundColour,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "600",
    color: "#222", // Darker title color for emphasis
    marginBottom: 16,
  },
  assessmentContainer: {
    backgroundColor: Colors.containerBackgroundColour, // White card-like background
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
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8, // Adds spacing below the header
  },
  moduleTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  button: {
    fontSize: 16,
    color: Colors.primary, // Use a primary color for the button
    fontWeight: "bold",
  },
  innerTxt: {
    fontSize: 16,
    color: "#444", // Neutral text color
    marginBottom: 8,
    lineHeight: 22, // Better readability
  },
  bold: {
    fontWeight: "700", // Stronger emphasis for labels
    color: Colors.textColourDark, // Black for bold text
  },
});

export default AssessmentsScreen;
