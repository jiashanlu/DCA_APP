import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { NativeBaseProvider, extendTheme, themeTools } from "native-base";
import LoginScreen from "./screens/LoginScreen";
import SignupScreen from "./screens/SignupScreen";
import { Appearance } from "react-native";
import { DefaultTheme, DarkTheme } from "@react-navigation/native";

const Stack = createStackNavigator();

class App extends React.Component {
  colorScheme = Appearance.getColorScheme();

  state = {
    colorMode: this.colorScheme,
  };

  setColorScheme = (colorScheme) => {
    this.setState({ colorMode: colorScheme });
    console.log(colorScheme);
  };

  listener = (Appearance.AppearanceListener = ({ colorScheme }) => {
    this.setColorScheme(colorScheme);

  });


  componentDidMount = () => {
    Appearance.addChangeListener(this.listener);
  };

  componentWillUnmount = () => {
    Appearance.removeChangeListener(this.listener);
  };

  theme = extendTheme({
    components: {
      Input: {
        baseStyle: (props) => {
          return {
            color: this.state.colorMode === 'dark' ? "#FFFFFF" : "#27272a",
          };
        },
      },
    },
  })


  render() {
    return (
      <NativeBaseProvider theme={this.theme} >
      <NavigationContainer theme= {this.state.colorMode === 'dark' ? DarkTheme : DefaultTheme}
        >
          <Stack.Navigator>
            <Stack.Screen name="Home" component={LoginScreen} />
            <Stack.Screen name="Signup" component={SignupScreen} />
          </Stack.Navigator>
        </NavigationContainer>
         </NativeBaseProvider>

    );
  }
}
export default App;
