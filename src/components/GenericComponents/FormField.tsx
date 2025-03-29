import React, { FC } from "react";
import { Control, Controller, Path, RegisterOptions } from "react-hook-form";
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
  rules?: RegisterOptions;
}> = ({
  control,
  controlName,
  title,
  controlledValue,
  styles = "",
  multiline = false,
  isHeader = true,
  rules = { required: false },
}) => {
  return (
    <View>
      {isHeader && (
        <Text className="text-base text-gray-100 font-pmedium">{title}</Text>
      )}
      <Controller
        control={control}
        name={controlName}
        rules={rules}
        render={({
          field: { onChange, onBlur, value },
          fieldState: { error },
        }) => (
          <View>
            <TextInput
              className={`border-2 px-4 bg-black-100 rounded-2xl
           focus:border-secondary ${error ? "border-red-500" : "border-black-200"} 
           items-center text-gray-100 ${styles}`}
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
            {error && <Text className="text-red-500">{error.message}</Text>}
          </View>
        )}
      />
    </View>
  );
};
