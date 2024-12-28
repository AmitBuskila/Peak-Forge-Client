import { FC, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  GestureResponderEvent,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Template } from "../../types/template";

export const SessionTemplate: FC<{ template: Template }> = ({
  template,
}: {
  template: Template;
}) => {
  const navigation = useNavigation<NavigationProp<string>>();

  const handleTemplatePress = (e: GestureResponderEvent) => {
    navigation.navigate("Template");
  };

  return (
    <TouchableOpacity
      className="relative justify-center items-center"
      activeOpacity={0.7}
      onPress={handleTemplatePress}
    >
      <ImageBackground
        style={styles.fuck}
        className="bg-white width-50 h-50 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 "
        source={{
          uri: "https://legacy.reactjs.org/logo-og.png",
        }}
        resizeMode="cover"
      />
      <Text className="3s font-psemibold color-secondary-100 ">
        {template.name || "new template"}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  fuck: { width: 150, height: 200 },
});
