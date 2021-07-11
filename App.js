import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider, extendTheme } from "native-base";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { Appearance } from 'react-native';
import { DefaultTheme, DarkTheme } from '@react-navigation/native';

const Stack = createStackNavigator();
const colorScheme = Appearance.getColorScheme();

function App() {
  return (
    <NativeBaseProvider>
      <NavigationContainer theme={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={LoginScreen} />
          <Stack.Screen name="Signup" component={SignupScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  );
}

export default App;
