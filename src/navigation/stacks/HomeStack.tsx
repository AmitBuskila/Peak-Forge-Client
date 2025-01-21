import { createStackNavigator } from "@react-navigation/stack";
import { HomeScreen } from "../../screens/HomeScreen";
import { WorkoutFormWrapper } from "../../contexts/Wrapper";

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
