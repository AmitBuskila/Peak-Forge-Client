import { FC } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { SessionTemplate } from "../components/SessionTemplate";

export const HomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Templates</Text>
      <ScrollView style={styles.scrollView} horizontal={true}>
        <SessionTemplate name="Push x Abs" />
        <SessionTemplate name="Pull x Legs" />
        <SessionTemplate />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    marginLeft: 15,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginVertical: 8,
  },
  scrollView: {
    width: "95%",
    height: Dimensions.get("window").height * 0.2,
    overflow: "hidden",
    borderRadius: 8,
    backgroundColor: "gray",
  },
});
