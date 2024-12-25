import { FC } from "react";
import { View, Text, StyleSheet } from "react-native";

export const AddSessionScreen: FC<{ navigation: any }> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text onPress={() => navigation.navigate("AddSession")}></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
