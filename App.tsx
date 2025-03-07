import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Provider } from "react-redux";
import "./global.css";
import "./ReactotronConfig";
import { AppProvider } from "./src/contexts/AppContext.context";
import { WorkoutFormProvider } from "./src/contexts/WorkoutForm.context";
import { Navigation } from "./src/navigation/Navigation";
import { store } from "./src/store";

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [barColor, setBarColor] = useState("#161622");
  const [fontsLoaded, error] = useFonts({
    "Poppins-Black": require("./assets/fonts/Poppins-Black.ttf"),
    "Poppins-Bold": require("./assets/fonts/Poppins-Bold.ttf"),
    "Poppins-ExtraBold": require("./assets/fonts/Poppins-ExtraBold.ttf"),
    "Poppins-ExtraLight": require("./assets/fonts/Poppins-ExtraLight.ttf"),
    "Poppins-Light": require("./assets/fonts/Poppins-Light.ttf"),
    "Poppins-Medium": require("./assets/fonts/Poppins-Medium.ttf"),
    "Poppins-Regular": require("./assets/fonts/Poppins-Regular.ttf"),
    "Poppins-SemiBold": require("./assets/fonts/Poppins-SemiBold.ttf"),
    "Poppins-Thin": require("./assets/fonts/Poppins-Thin.ttf"),
  });

  useEffect(() => {
    if (error) throw error;

    if (fontsLoaded) {
      SplashScreen.hideAsync();
      setBarColor("primary");
    }
  }, [fontsLoaded, error]);

  if (!fontsLoaded && !error) {
    return null;
  }

  return (
    <SafeAreaView className={`bg-${barColor} h-full color-white`}>
      <Provider store={store}>
        <AppProvider>
          <GestureHandlerRootView>
            <WorkoutFormProvider>
              <Navigation />
            </WorkoutFormProvider>
          </GestureHandlerRootView>
        </AppProvider>
      </Provider>

      <StatusBar backgroundColor={barColor} style="light" />
    </SafeAreaView>
  );
}
