import { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  GestureResponderEvent,
  TouchableOpacity,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

export const SessionTemplate: FC<{ name?: string }> = ({ name }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProp<string>>();

  const handleTemplatePress = (e: GestureResponderEvent) => {
    setModalVisible(true);
    if (!name) {
      navigation.navigate("Template");
    }
  };

  const SessionIcon = () => {
    return name ? (
      <Image style={styles.image} source={require("../../assets/gym.webp")} />
    ) : (
      <Image style={styles.image} source={require("../../assets/plus.webp")} />
    );
  };
  return (
    <TouchableOpacity
      style={{
        ...styles.card,
        borderStyle: name ? "solid" : "dashed",
        borderColor: name ? "black" : "gray",
      }}
      onPress={handleTemplatePress}
    >
      <SessionIcon />
      <Text style={styles.name}>{name || "new template"}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    borderRadius: 8,
    borderStyle: "dashed",
    borderWidth: 2,
    padding: 16,
    margin: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    width: Dimensions.get("window").width * 0.35,
    height: Dimensions.get("window").width * 0.35,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 10,
  },
  image: {
    width: Dimensions.get("window").width * 0.15,
    height: Dimensions.get("window").width * 0.15,
  },
});
