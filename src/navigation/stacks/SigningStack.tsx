import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../../screens/LoginScreen";
import { SignUpScreen } from "../../screens/SignUpScreen";
import { ForgotPasswordScreen } from "../../screens/ForgotPasswordScreen";

const Stack = createStackNavigator();

export const SigningStack = () => {
  return (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Sign Up"
        options={{
          headerStyle: { backgroundColor: "#161622" },
          headerTintColor: "#CDCDE0",
        }}
        component={SignUpScreen}
      />
      <Stack.Screen
        name="Forgot Password"
        options={{
          headerStyle: { backgroundColor: "#161622" },
          headerTintColor: "#CDCDE0",
        }}
        component={ForgotPasswordScreen}
      />
    </Stack.Navigator>
  );
};
