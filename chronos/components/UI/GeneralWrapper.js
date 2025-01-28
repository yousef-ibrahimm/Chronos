import { View, Text, StyleSheet, Pressable, FlatList } from "react-native";

export default function GeneralWrapper({ moduleData }) {
  const renderModuleData = (module) => {
    return (
      <View style={styles.innerContainer}>
        <Text style={styles.innerTxt}>
          Assessment: {parseInt(module.index) + 1}
        </Text>
        <Text style={styles.innerTxt}>
          Method of Assessment: {module.item["Method of Assessment"]}
        </Text>
        <Text style={styles.innerTxt}>
          Deadline: {module.item["Assessment Date"]}
        </Text>
        <Text style={styles.innerTxt}>Worth: {module.item["Weight"]}</Text>
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
    verticalAlign: "middle",
    color: "white",
    fontWeight: "bold",
  },
  innerTxt: {
    fontSize: 20,
    verticalAlign: "middle",
    color: "white",
  },
});
