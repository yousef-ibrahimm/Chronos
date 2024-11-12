import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

export default function GeneralWrapper({ moduleData }) {
  // console.log(moduleData.item);
  const renderModuleData = (module) => {
    console.log(parseInt(module.item["Weight"]));
    return (
      <View>
        <Text>Assessment: {parseInt(module.index) + 1}</Text>
        <Text>Method of Assessment: {module.item["Method of Assessment"]}</Text>
        <Text>Deadline: {module.item["Assessment Date"]}</Text>
        <Text>Worth: {module.item["Weight"]}</Text>
        <Text>-----------------------------------------------</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.txt}>{moduleData.item[0]["Module Name"]}</Text>
        <FlatList data={moduleData.item} renderItem={renderModuleData} />
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
    backgroundColor: "yellow",
  },
  txt: {
    fontSize: 35,
    textAlign: "right",
    verticalAlign: "middle",
    color: "black",
  },
});
