import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { AddSessionScreen } from "../screens/AddSession";
import { OtherScreen } from "../screens/OtherScreen";
import { HomeStack } from "./stacks/HomeStack";

const Tab = createBottomTabNavigator();

const screenResolver: Record<string, string> = {
  Home: "home",
  Other: "settings",
  AddSession: "list",
};

export const Navigation = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        screenOptions={({ route }: { route: { name: string } }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: string = screenResolver[route.name];
            if (focused) {
              iconName += "-outline";
            }
            return <IonIcons name={iconName} size={size} color={color} />;
          },
          headerShown: false,
        })}
      >
        <Tab.Screen name={"Other"} component={OtherScreen} />
        <Tab.Screen name={"Home"} component={HomeStack} />
        <Tab.Screen name={"AddSession"} component={AddSessionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
