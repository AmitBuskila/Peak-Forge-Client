import React, { FC } from "react";
import { Control, Controller } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { FormValues } from "./TemplateModal";

export const FormField: FC<{
  control: Control<FormValues>;
  title: string;
  styles?: string;
  multiline?: boolean;
}> = ({ control, title, styles = "", multiline = false }) => {
  return (
    <View>
      <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      <Controller
        control={control}
        name={title.trim() as keyof FormValues}
        rules={{ required: false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`border-2 border-black-200 px-4 bg-black-100 rounded-2xl
           focus:border-secondary items-center text-gray-100 ${styles} `}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            textAlignVertical="top"
            multiline={multiline}
          />
        )}
      />
    </View>
  );
};
