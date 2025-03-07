import { createStackNavigator } from "@react-navigation/stack";
import { LoginScreen } from "../../screens/LoginScreen";
import { RegisterScreen } from "../../screens/RegisterScreen";

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
        name="Register"
        options={{
          headerStyle: { backgroundColor: "#161622" },
          headerTintColor: "#CDCDE0",
        }}
        component={RegisterScreen}
      />
    </Stack.Navigator>
  );
};
