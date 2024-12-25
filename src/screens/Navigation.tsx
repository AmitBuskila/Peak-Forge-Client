import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import IonIcons from "react-native-vector-icons/Ionicons";
import { HomeScreen } from "./HomeScreen";
import { OtherScreen } from "./OtherScreen";
import { AddSessionScreen } from "./AddSession";
import { View, StyleSheet } from "react-native";

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
        })}
      >
        <Tab.Screen name={"Home"} component={HomeScreen} />
        <Tab.Screen name={"Other"} component={OtherScreen} />
        <Tab.Screen name={"AddSession"} component={AddSessionScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};
