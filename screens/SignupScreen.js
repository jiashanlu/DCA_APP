import * as React from "react";
import { useState } from "react";
import { Auth } from "aws-amplify";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  KeyboardAvoidingView,
} from "native-base";

export default function SignupScreen() {
  
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  async function signUp() {
        try {
          await Auth.signUp({ username, password, attributes: { email }});
          console.log(' Sign-up Confirmed');
        } catch (error) {
          console.log(' Error signing up...', error);
        }
      }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box flex={1} p={2} w="90%" mx="auto" justifyContent="center" safeArea>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
          <Heading size="lg" color="primary.500">
            Welcome
          </Heading>
          <Heading color="muted.400" size="xs">
            Sign up to continue!
          </Heading>

          <VStack space={2} mt={5}>
          <FormControl>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Username
              </FormControl.Label>
              <Input value={username} onChangeText={text => setUsername(text)}/>
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Email
              </FormControl.Label>
              <Input value={email} onChangeText={text => setEmail(text)}/>
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Password
              </FormControl.Label>
              <Input type="password" value={password} onChangeText={text => setPassword(text)}/>
            </FormControl>
            <VStack space={2} mt={5}>
              <Button colorScheme="cyan" _text={{ color: "white" }} onPress={signUp}>
                SignUp
              </Button>
            </VStack>
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
}
