import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import Papa from "papaparse";

const HomeScreen = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchParseData = async () => {
      const response = await fetch("../resources/test.csv");
      const csvText = await response.text();
      Papa.parse(csvText, {
        delimiter: ",",
        complete: (result) => {
          setData(result.data);
        },
      });
    };
    fetchParseData();
  }, []); // Empty dependency array

  const test = data.length > 0 ? data[0] : null; // Check if data is populated

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{test ? test[1] : "Loading..."}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
  },
});

export default HomeScreen;
