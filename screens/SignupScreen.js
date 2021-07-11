import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { TouchableWithoutFeedback, Keyboard } from "react-native";
import {
  Box,
  Heading,
  VStack,
  FormControl,
  Input,
  Button,
  Icon,
  IconButton,
  HStack,
  KeyboardAvoidingView,
} from "native-base";

export default function SignupScreen() {
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
                Email
              </FormControl.Label>
              <Input />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Password
              </FormControl.Label>
              <Input type="password" />
            </FormControl>
            <FormControl>
              <FormControl.Label
                _text={{ color: "muted.700", fontSize: "sm", fontWeight: 600 }}
              >
                Confirm Password
              </FormControl.Label>
              <Input type="password" />
            </FormControl>
            <VStack space={2} mt={5}>
              <Button colorScheme="cyan" _text={{ color: "white" }}>
                SignUp
              </Button>

              <HStack justifyContent="center" alignItem="center">
                <IconButton
                  variant="unstyled"
                  startIcon={
                    <Icon
                      as={<MaterialCommunityIcons name="facebook" />}
                      color="muted.700"
                      size="sm"
                    />
                  }
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
                />
                <IconButton
                  variant="unstyled"
                  startIcon={
                    <Icon
                      as={<MaterialCommunityIcons name="github" />}
                      color="muted.700"
                      size="sm"
                    />
                  }
                />
              </HStack>
            </VStack>
          </VStack>
        </KeyboardAvoidingView>
      </Box>
    </TouchableWithoutFeedback>
  );
}
