import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, TextInput } from "react-native";
import { Excercise } from "./src/components/dummy";
import { LinearGradient } from "expo-linear-gradient";
import { Navigation } from "./src/screens/Navigation";

export default function App() {
  return (
    <LinearGradient colors={["black", "gray"]} style={styles.container}>
      <Navigation />
      <StatusBar style="auto" />
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
