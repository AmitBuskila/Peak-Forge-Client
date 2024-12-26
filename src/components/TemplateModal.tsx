import { useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { Text, View } from "react-native";

export const TemplateModal: FC<{}> = () => {
  const navigation = useNavigation();
  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 30 }} onPress={() => navigation.goBack()}>
        This is a modal!
      </Text>
    </View>
  );
};
