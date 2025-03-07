import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { ActiveWorkout } from "../screens/ActiveWorkout";
import { AddSessionScreen } from "../screens/AddSession";
import { OtherScreen } from "../screens/OtherScreen";
import { HomeStack } from "./stacks/HomeStack";
import { useSelector } from "react-redux";
import { UserSliceState } from "../store/slices/UserSlice";
import { SigningStack } from "./stacks/SigningStack";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";

const Tab = createBottomTabNavigator();

const screenResolver: Record<string, string> = {
  Home: "home",
  Other: "settings",
  AddSession: "list",
};

export const Navigation = () => {
  const userSlice = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice
  );
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("USER_TOKEN");
      setToken(token);
    })();
  }, [userSlice]);

  return (
    <NavigationContainer>
      {token ? (
        <Tab.Navigator
          initialRouteName={"Home"}
          screenOptions={({ route }: { route: { name: string } }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName: string = screenResolver[route.name];
              if (focused) {
                iconName += "-outline";
              }
              return <IonIcons name={iconName} size={size} color={color} />;
            },
            headerShown: false,
            tabBarStyle: { backgroundColor: "#161622" },
            tabBarActiveTintColor: "#5f2aa1",
            tabBarInactiveTintColor: "gray",
            headerRight: () => <IonIcons name="home" size={30} />,
          })}
        >
          <Tab.Screen name={"Other"} component={OtherScreen} />
          <Tab.Screen name={"Home"} component={HomeStack} />
          <Tab.Screen name={"AddSession"} component={AddSessionScreen} />
        </Tab.Navigator>
      ) : (
        <SigningStack />
      )}

      <ActiveWorkout />
    </NavigationContainer>
  );
};
