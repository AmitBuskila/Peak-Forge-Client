import React, { FC } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { FormField } from "./FormField";
import { CustomImagePicker } from "./CustomImagePicker";
import { CustomButton } from "./CustomButton";
import { WorkoutCarousel } from "./Workouts/WorkoutCarousel";

export interface FormValues {
  Image: string;
  WorkoutName: string;
  Description: string;
}

export const TemplateModal: FC<{}> = () => {
  const {
    setValue,
    handleSubmit,
    control,
    reset,
    getValues,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  return (
    <ScrollView className="bg-primary h-full">
      <View className="w-full justify-center h-full px-4 my-4">
        <FormField
          title="Workout Name"
          control={control}
          styles="w-full h-14"
        />
        <View className="my-2 flex flex-row items-center">
          <FormField
            title="Description"
            control={control}
            styles="w-[66vw] h-28"
            multiline={true}
          />
          <CustomImagePicker
            styles="w-[24vw] h-28 mx-4 mt-5"
            setValue={setValue}
            uri={getValues("Image")}
          />
        </View>
        <WorkoutCarousel />
        <CustomButton title="Create Template" handlePress={() => {}} />
      </View>
    </ScrollView>
  );
};
