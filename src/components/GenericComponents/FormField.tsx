import React, { FC } from "react";
import { Control, Controller, Path } from "react-hook-form";
import { Text, TextInput, View } from "react-native";
import { FormValues } from "../../contexts/WorkoutForm.context";
import { SignUpFormValues } from "../../screens/SignUpScreen";

export const FormField: FC<{
  control: Control<any>;
  controlName: Path<FormValues & SignUpFormValues>;
  title: string;
  controlledValue?: string;
  styles?: string;
  multiline?: boolean;
  isHeader?: boolean;
}> = ({
  control,
  controlName,
  title,
  controlledValue,
  styles = "",
  multiline = false,
  isHeader = true,
}) => {
  return (
    <View>
      {isHeader && (
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      )}
      <Controller
        control={control}
        name={controlName}
        rules={{ required: false }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            className={`border-2 border-black-200 px-4 bg-black-100 rounded-2xl
           focus:border-secondary items-center text-gray-100 ${styles} `}
            onBlur={onBlur}
            onChangeText={onChange}
            value={
              controlledValue === undefined
                ? value?.toString()
                : controlledValue
            }
            textAlignVertical="top"
            multiline={multiline}
            placeholder={isHeader ? "" : title + "..."}
            placeholderTextColor={"#777"}
          />
        )}
      />
    </View>
  );
};
