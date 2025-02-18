import { View, Text, StyleSheet, FlatList } from "react-native";

export default function GeneralWrapper({ moduleData }) {
  const item = moduleData.item;

  // Define the specific properties to display
  const allowedKeys = [
    "Assessment Date",
    "Method of Assessment",
    "Weight",
    "Credits",
    "Length",
    "Module Coordinator",
  ];

  // Filter only the allowed keys
  const filteredDetails = allowedKeys.map((key) => ({
    key,
    value: item[key],
  }));

  const renderModuleData = ({ item }) => (
    <View>
      <Text style={styles.innerTxt}>
        <Text style={styles.bold}>{item.key}:</Text> {item.value}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.txt}>{item["Module Name"]}</Text>
      <View style={styles.innerContainer}>
        <FlatList
          data={filteredDetails}
          renderItem={renderModuleData}
          keyExtractor={(item) => item.key}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "purple",
  },
  innerContainer: {
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginVertical: 4,
    marginHorizontal: 12,
    backgroundColor: "black",
  },
  txt: {
    fontSize: 35,
    textAlign: "left",
    color: "white",
    fontWeight: "bold",
    marginBottom: 8,
  },
  innerTxt: {
    fontSize: 20,
    color: "white",
  },
  bold: {
    fontWeight: "bold",
  },
});
