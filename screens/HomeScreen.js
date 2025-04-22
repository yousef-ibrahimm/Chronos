import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ActivityIndicator, // Added ActivityIndicator
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { StudentContext } from "../store/context/student-context";
import { callApi } from "../utils/moduleApi";
import { Colors } from "../components/constants/colors";

const HomeScreen = ({ navigation }) => {
  const studentCtxt = useContext(StudentContext);
  const modules = studentCtxt.modules.split(",");
  const [moduleData, setModuleData] = useState([]);
  const [isLoadingModules, setIsLoadingModules] = useState(true); // Added loading state for modules

  useEffect(() => {
    const fetchData = async () => {
      try {
        const newModuleData = [];
        for (const module of modules) {
          const response = await callApi("Module Code", module);
          newModuleData.push(response[0].data);
        }
        setModuleData(newModuleData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoadingModules(false); // Set loading to false after fetching
      }
    };

    fetchData();
  }, [studentCtxt.studentId]);

  useEffect(() => {
    if (moduleData.length > 0) {
      studentCtxt.setModuleData(moduleData);
    }
  }, [moduleData]);

  function findClosestAssessment(data) {
    const today = new Date();
    let closestAssessment = null;
    let smallestDiff = Infinity;

    data.flat(2).forEach((assessment) => {
      const assessmentDate = new Date(assessment["Assessment Date"]);
      if (assessmentDate < today) {
        return;
      }
      const diff = Math.abs(assessmentDate - today);
      if (diff < smallestDiff) {
        smallestDiff = diff;
        closestAssessment = assessment;
      }
    });
    return closestAssessment;
  }

  const closestAssessment = findClosestAssessment(moduleData);
  const daysRemaining = closestAssessment
    ? Math.ceil(
        (new Date(closestAssessment["Assessment Date"]) - new Date()) /
          (1000 * 60 * 60 * 24)
      )
    : null;

  const handleModulePress = (module) => {
    navigation.navigate("Assessments", { moduleData: module });
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chronos</Text>
        <Text style={styles.headerSubtitle}>
          Welcome, {studentCtxt.studentName}
        </Text>
      </View>

      {/* Next Deadline Section */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Next Deadline</Text>
        {closestAssessment ? (
          <View style={styles.cardContent}>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>Module:</Text>{" "}
              {closestAssessment["Module Name"]}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>Assessment:</Text>{" "}
              {closestAssessment["Method of Assessment"]}
            </Text>
            <Text style={styles.cardText}>
              <Text style={styles.bold}>Due in:</Text>{" "}
              <Text
                style={[
                  styles.daysRemaining,
                  daysRemaining <= 3
                    ? styles.dueSoon
                    : daysRemaining <= 7
                    ? styles.dueSoonish
                    : styles.dueLater,
                ]}
              >
                {daysRemaining > 0 ? `${daysRemaining} days` : "Due today!"}
              </Text>
            </Text>
          </View>
        ) : (
          <Text style={styles.loadingText}>Loading...</Text>
        )}
      </View>

      {/* Module List */}
      <View style={styles.moduleListContainer}>
        <Text style={styles.moduleListTitle}>Your Modules</Text>
        {isLoadingModules ? ( // Show loading animation while modules are being fetched
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.primaryColour} />
            <Text style={styles.loadingText}>Loading Modules...</Text>
          </View>
        ) : (
          <FlatList
            data={moduleData}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.moduleItem}
                onPress={() => handleModulePress(item)}
              >
                <Text style={styles.moduleText}>{item[0]["Module Name"]}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.backgroundColour,
    padding: 20,
  },
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textColourDark,
  },
  headerSubtitle: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.textColourDark,
    marginTop: 4,
  },
  card: {
    backgroundColor: "#f9f9f9",
    borderRadius: 16,
    padding: 20,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    marginVertical: 12,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.textColourDark,
    marginBottom: 16,
    textAlign: "center",
  },
  cardContent: {
    alignItems: "flex-start",
  },
  cardText: {
    fontSize: 18,
    color: "#555",
    marginBottom: 12,
    lineHeight: 26,
  },
  bold: {
    fontWeight: "700",
    color: Colors.textColourDark,
  },
  daysRemaining: {
    fontWeight: "700",
  },
  dueSoon: {
    color: "red",
  },
  dueSoonish: {
    color: "orange",
  },
  dueLater: {
    color: "green",
  },
  loadingText: {
    fontSize: 16,
    color: "#888",
    textAlign: "center",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  moduleListContainer: {
    marginTop: 20,
  },
  moduleListTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: Colors.textColourDark,
    marginBottom: 12,
  },
  moduleItem: {
    padding: 15,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginBottom: 10,
    elevation: 2,
  },
  moduleText: {
    fontSize: 18,
    color: Colors.textColourDark,
  },
});

export default HomeScreen;
