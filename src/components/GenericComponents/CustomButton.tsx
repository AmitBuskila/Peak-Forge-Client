import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { Text, TouchableOpacity } from "react-native";

export const CustomButton: FC<{
  title: string;
  handlePress: (data: any) => void;
  disabled?: boolean;
}> = ({ title, handlePress, disabled = false }) => {
  return (
    <LinearGradient
      colors={["#48138b", "#7448ac"]}
      start={{ x: 0, y: 0.5 }}
      end={{ x: 1, y: 0.5 }}
      style={{
        borderRadius: 8,
        opacity: disabled ? 0.3 : 1,
      }}
    >
      <TouchableOpacity
        onPress={handlePress}
        className={"min-h-[62px] justify-center"}
        disabled={disabled}
      >
        <Text className="text-center text-primary font-psemibold text-lg">
          {title}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};
