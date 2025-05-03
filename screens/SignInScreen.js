import React, { useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, Platform } from "react-native";
import { StudentContext } from "../store/context/student-context";
import { Colors } from "../components/constants/colors";
import GoogleSignIn from "../utils/GoogleSignIn";

const SignInScreen = ({ navigation }) => {
  const studentCtxt = useContext(StudentContext);

  const mockGoogleInfo = {
    email: "up2051442@myport.ac.uk",
    family_name: "Ibrahim",
    given_name: "Yousef Yaser Ibrahim Fathy",
    hd: "myport.ac.uk",
    id: "101079455864733419091",
    name: "Yousef Yaser Ibrahim Fathy Ibrahim",
    picture:
      "https://lh3.googleusercontent.com/a/ACg8ocJx1f9Zn47TNUahWBaR8rkR7pADZWeywvHs7ClUYoe62g5a5g=s96-c",
    verified_email: true,
  };

  function navigateToHome() {
    navigation.navigate("Loading");
  }

  useEffect(() => {
    if (Platform.OS === "ios" || Platform.OS === "android") {
      // Set mock data and navigate to loading screen
      studentCtxt.googleInfo = mockGoogleInfo;
      navigateToHome();
    } else if (
      studentCtxt.googleInfo &&
      Object.keys(studentCtxt.googleInfo).length > 0
    ) {
      console.log("SignInScreen", studentCtxt.googleInfo);
      navigateToHome();
    }
  }, [studentCtxt.googleInfo]);

  if (Platform.OS === "ios" || Platform.OS === "android") {
    // Skip rendering GoogleSignIn for mobile devices
    return null;
  }

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/logo-dark.png")}
        style={styles.logo}
        resizeMode="contain"
      />
      <Text style={styles.title}>Welcome to Chronos</Text>
      <Text style={styles.subtitle}>Sign in to continue</Text>
      <GoogleSignIn />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: Colors.backgroundColour,
    padding: 16,
    paddingTop: 75,
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: Colors.textColourDark,
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "400",
    color: Colors.textColourDark,
    marginBottom: 24,
    textAlign: "center",
    lineHeight: 24,
  },
  input: {
    width: "85%",
    marginVertical: 10,
    backgroundColor: "#FFFFFF",
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
    borderWidth: 1,
    borderColor: "#D1D5DB",
    color: "#1F2937",
  },
  chip: {
    marginTop: 16,
    backgroundColor: Colors.accent,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  chipText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default SignInScreen;
