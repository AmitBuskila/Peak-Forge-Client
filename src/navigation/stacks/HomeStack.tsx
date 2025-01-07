import { createStackNavigator } from "@react-navigation/stack";
import { WorkoutFormWrapper } from "../../contexts/WorkoutForm.context";
import { HomeScreen } from "../../screens/HomeScreen";

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Template"
        options={{
          headerStyle: { backgroundColor: "#161622" },
          headerTintColor: "#CDCDE0",
        }}
        component={WorkoutFormWrapper}
      />
    </Stack.Navigator>
  );
};
