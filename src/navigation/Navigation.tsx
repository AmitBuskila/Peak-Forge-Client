import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { ActiveWorkout } from "../screens/ActiveWorkout";
import { Stats } from "../screens/StatsScreen";
import { ProfileScreen } from "../screens/ProfileScreen";
import { loginToken, UserSliceState } from "../store/slices/UserSlice";
import { HomeStack } from "./stacks/HomeStack";
import { SigningStack } from "./stacks/SigningStack";

const Tab = createBottomTabNavigator();

const screenResolver: Record<string, string> = {
  Home: "barbell",
  Profile: "people",
  Stats: "stats-chart",
};

export const Navigation = () => {
  const userSlice = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice
  );
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("USER_TOKEN");
      dispatch(loginToken({ token }));
    })();
  }, [userSlice]);

  return (
    <NavigationContainer>
      {userSlice.token ? (
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
          })}
        >
          <Tab.Screen name={"Profile"} component={ProfileScreen} />
          <Tab.Screen name={"Home"} component={HomeStack} />
          <Tab.Screen name={"Stats"} component={Stats} />
        </Tab.Navigator>
      ) : (
        <SigningStack />
      )}

      <ActiveWorkout />
    </NavigationContainer>
  );
};
