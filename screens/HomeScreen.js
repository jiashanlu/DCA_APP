import * as React from "react";
import { Button } from "react-native";
import { Auth } from 'aws-amplify';
import {
  Box,
  Text,
} from "native-base";

export default function HomeScreen({ navigation }) {

  return (
    <Box flex={1} p={2} w="90%" mx="auto" justifyContent="center" safeArea>
      <Text> Home Screen </Text>
      <Button onPress={() => Auth.signOut()} title='Sign out' />
    </Box>
  );
}

