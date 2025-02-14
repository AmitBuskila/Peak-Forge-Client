import { createStackNavigator } from "@react-navigation/stack";
import { TemplateModal } from "../../components/Workouts/TemplateModal";
import { WorkoutFormProvider } from "../../contexts/WorkoutForm.context";
import { HomeScreen } from "../../screens/HomeScreen";
import { SearchExercisesScreen } from "../../screens/SearchExercises";

const Stack = createStackNavigator();

export const HomeStack = () => {
  return (
    <WorkoutFormProvider>
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
    </WorkoutFormProvider>
  );
};
