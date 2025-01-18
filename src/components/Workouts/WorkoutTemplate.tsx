import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC } from "react";
import {
  GestureResponderEvent,
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import { Template } from "../../../types/template";

export const WorkoutTemplate: FC<{ template: Template }> = ({
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
          uri: template.uri,
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
