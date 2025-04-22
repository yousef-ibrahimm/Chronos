import { View, StyleSheet, Pressable } from "react-native";
import { Card } from "react-native-paper";
import { Colors } from "../constants/colors";

export default function GeneralWrapper({ moduleData, onPress }) {
  const item = moduleData.item;

  return (
    <Pressable onPress={onPress}>
      <View style={styles.cardContainer}>
        <View style={{ borderRadius: 12, overflow: "hidden" }}>
          <Card style={styles.card}>
            <Card.Title
              title={item[0]["Module Name"]}
              subtitle={`Number of Assessments: ${item.length}`}
              titleStyle={styles.title} // Apply custom title style
              subtitleStyle={styles.subtitle} // Apply custom subtitle style
              theme="dark"
            />
          </Card>
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 12,
    elevation: 4, // Adds shadow for Android
    shadowColor: "#000", // Adds shadow for iOS
    shadowOffset: { width: 0, height: 1 }, // Reduce shadow height
    shadowOpacity: 0.1, // Lower opacity
    shadowRadius: 2, // Smaller radius
  },
  card: {
    backgroundColor: Colors.containerBackgroundColour,
    padding: 16,
  },
  title: {
    fontSize: 18, // Larger font size for the title
    fontWeight: "bold", // Bold text for emphasis
    color: "#333", // Darker color for better readability
  },
  subtitle: {
    fontSize: 14, // Slightly smaller font size for the subtitle
    color: "#666", // Lighter color for contrast
  },
});
