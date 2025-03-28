import { View, Text, StyleSheet, FlatList, Pressable } from "react-native";

export default function GeneralWrapper({ moduleData, onPress }) {
  const item = moduleData.item;
  console.log(item);

  return (
    <View style={styles.container}>
      <Pressable onPress={onPress}>
        <Text style={styles.txt}>{item[0]["Module Name"]}</Text>
      </Pressable>
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
