import { createStackNavigator } from "@react-navigation/stack";
import { TemplateModal } from "../../components/Workouts/TemplateModal";
import { HomeScreen } from "../../screens/HomeScreen";
import { SearchExercisesScreen } from "../../screens/SearchExercises";
import { useAppContext } from "../../contexts/AppContext.context";

const Stack = createStackNavigator();

export const HomeStack = () => {
  const [activeWorkout] = useAppContext().activeWorkout;

  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Create Template"
        options={{
          headerStyle: { backgroundColor: "#161622" },
          title: activeWorkout ? "Update Template" : "Create Template",
          headerTintColor: "#CDCDE0",
        }}
        component={TemplateModal}
      />
      <Stack.Screen
        name="Exercises"
        options={{
          headerStyle: { backgroundColor: "#161622" },
          headerTintColor: "#CDCDE0",
        }}
        component={SearchExercisesScreen}
      />
    </Stack.Navigator>
  );
};
