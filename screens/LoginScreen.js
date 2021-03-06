import * as React from "react";
import { useContext } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import {
  Box,
  Text,
  Heading,
  VStack,
  FormControl,
  Input,
  Link,
  Button,
  Icon,
  IconButton,
  HStack,
  KeyboardAvoidingView,
} from "native-base";
import { Auth } from "aws-amplify";
import { AuthContext } from "../components/AuthContext";

export default function LoginScreen({ navigation }) {
  const setUserStatus = useContext(AuthContext);
  const handleSignupButton = () => {
    navigation.navigate("Signup");
  };
  const handleOnPress = (provider) => {
    setUserStatus("loading");
    Auth.federatedSignIn({ provider });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Box flex={1} p={2} w="90%" mx="auto" justifyContent="center" safeArea>
        <KeyboardAvoidingView behavior="position" keyboardVerticalOffset={100}>
          <Heading size="lg" color="primary.500">
            Welcome
          </Heading>
          <Heading color="muted.400" size="xs">
            Sign in to continue !
          </Heading>
          <VStack space={2} mt={5}>
            <FormControl
              _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
            >
              <FormControl.Label>Email ID</FormControl.Label>
              <Input />
            </FormControl>
            <FormControl mb={5}>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Password
              </FormControl.Label>
              <Input type="password" />
              <Link
                _text={{ fontSize: "xs", fontWeight: "700", color: "cyan.500" }}
                alignSelf="flex-end"
                mt={1}
              >
                Forget Password?
              </Link>
            </FormControl>
            <VStack space={2}>
              <Button colorScheme="cyan" _text={{ color: "white" }}>
                Login
              </Button>

              <HStack justifyContent="center" alignItem="center">
                <IconButton
                  variant="unstyled"
                  startIcon={
                    <Icon
                      as={<MaterialCommunityIcons name="apple" />}
                      color="muted.700"
                      size="sm"
                    />
                  }
                  onPress={() => handleOnPress("SignInWithApple")}
                />
                <IconButton
                  variant="unstyled"
                  startIcon={
                    <Icon
                      as={<MaterialCommunityIcons name="amazon" />}
                      color="muted.700"
                      size="sm"
                    />
                  }
                  onPress={() => handleOnPress("LoginWithAmazon")}
                />
                <IconButton
                  variant="unstyled"
                  startIcon={
                    <Icon
                      as={<MaterialCommunityIcons name="google" />}
                      color="muted.700"
                      size="sm"
                    />
                  }
                  onPress={() => handleOnPress("Google")}
                />
              </HStack>
            </VStack>
            <HStack justifyContent="center">
              <Text fontSize="sm" color="muted.700" fontWeight={400}>
                I'm a new user.{" "}
              </Text>
              <TouchableOpacity onPress={handleSignupButton}>
                <Text color="cyan.500" bold={true} fontSize="sm">
                  Sign Up
                </Text>
              </TouchableOpacity>
            </HStack>
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
}
