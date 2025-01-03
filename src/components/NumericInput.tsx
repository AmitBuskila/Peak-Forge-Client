import React, { FC } from "react";
import { Controller, useForm } from "react-hook-form";
import { TextInput, View } from "react-native";
import { FormValues } from "./TemplateModal";

export const NumericInput: FC<{
  name: string;
}> = ({ name }) => {
  const { control } = useForm<FormValues>(); // todo use fron context
  return (
    <View>
      <Controller
        name={"Image"}
        control={control}
        rules={{ required: true }}
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            onBlur={onBlur}
            maxLength={3}
            keyboardType="number-pad"
            className={`border-2 border-black-200  bg-primary rounded-2xl
           focus:border-secondary items-center text-center text-gray-100 px-5`}
          />
        )}
      />
    </View>
  );
};
