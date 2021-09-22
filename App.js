import * as React from "react";
import { useState, useEffect } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NativeBaseProvider } from "native-base";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import HomeScreen from "./screens/HomeScreen";
import LoadingScreen from "./screens/LoadingScreen";
import { Appearance, Linking } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";
import { Amplify, Auth, Hub } from "aws-amplify";
import * as WebBrowser from 'expo-web-browser';
import awsconfig from "./src/aws-exports";
import {AuthContext} from "./components/AuthContext"
Amplify.configure({
  ...awsconfig,
  oauth: {
      ...awsconfig.oauth,
      urlOpener,
  },
});


async function urlOpener(url, redirectUrl) {
  const { type, url: newUrl } = await WebBrowser.openAuthSessionAsync(
      url,
      redirectUrl
  );

  if (type === 'success' && Platform.OS === 'ios') {
      WebBrowser.dismissBrowser();
      return Linking.openURL(newUrl);
  }
}

function App(props) {
  const Stack = createNativeStackNavigator();
  const [colorScheme, setColorSheme] = useState(Appearance.getColorScheme());
  const [userStatus, setUserStatus] = useState("isNotAuthentificated");
  const listener = (data) => {
    switch (data.payload.event) {
      case "signIn":
        checkIfAuth();
        break;
      case "signOut":
        checkIfAuth();
        break;
    }
  };
  const colorChange = ({ colorScheme }) => {
    setColorSheme(colorScheme)
    console.log(colorScheme);
  }
  async function checkIfAuth() {
    let currentSession = null;
    try {
      currentSession = await Auth.currentSession();
    } catch (err) {
      console.log(err);
    } finally {
      currentSession
        ? setUserStatus("isAuthentificated")
        : setUserStatus("isNotAuthentificated");
        console.log(userStatus)
    }
  }
  useEffect(() => {
    checkIfAuth();
    Hub.listen("auth", listener);
    Appearance.addChangeListener(colorChange)
    return () => {
      Appearance.removeChangeListener(colorChange);
      Hub.remove("auth", listener)
    };
  }, []);


  return (
    <NativeBaseProvider>
      <NavigationContainer
        theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      >
        <AuthContext.Provider value={setUserStatus}>
        <Stack.Navigator>
          {userStatus == "loading" ? (
            <>
              <Stack.Screen name="Loading" component={LoadingScreen} />
            </>
          ) : userStatus == "isAuthentificated" ? (
            <>
              <Stack.Screen name="Home" component={HomeScreen} />
            </>
          ) : (
            <>
              <Stack.Screen name="Login" component={LoginScreen} />
              <Stack.Screen name="Signup" component={SignupScreen} />
            </>
          )}
        </Stack.Navigator>
        </AuthContext.Provider>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}
export default App;
