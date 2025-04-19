import React, { useContext, useEffect, useState } from "react";
import { Button, Text, View } from "react-native";
import * as Google from "expo-auth-session/providers/google";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as WebBrowser from "expo-web-browser";
import { StudentContext } from "../store/context/student-context";

WebBrowser.maybeCompleteAuthSession();

const CLIENT_ID =
  "548333917569-jnfrvhdsb05pih5q4um8ft7n78vrkq8n.apps.googleusercontent.com"; // Replace this

const discovery = {
  authorizationEndpoint: "https://accounts.google.com/o/oauth2/v2/auth",
  tokenEndpoint: "https://oauth2.googleapis.com/token",
  revocationEndpoint: "https://oauth2.googleapis.com/revoke",
};

export default function GoogleSignIn({ navigation }) {
  const [userInfo, setUserInfo] = useState(null);
  const studentCtxt = useContext(StudentContext);

  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: CLIENT_ID,
  });

  useEffect(() => {
    handleSignIn();
  }, [response]);

  useEffect(() => {
    if (userInfo) {
      studentCtxt.setGoogleInfoCx(userInfo); // Fixed the method name
    }
  }, [userInfo]);

  async function handleSignIn() {
    const user = await AsyncStorage.getItem("@user");
    if (!user) {
      if (response?.type === "success") {
        await getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(JSON.parse(user));
    }
  }

  async function getUserInfo(token) {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Button title="Sign in with Google" onPress={promptAsync} />
    </View>
  );
}
