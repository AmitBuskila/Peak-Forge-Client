import React, { FC } from "react";
import { ScrollView, View } from "react-native";
import {
  FormValues,
  useWorkoutFormContext,
} from "../contexts/WorkoutForm.context";
import { CustomButton } from "./CustomButton";
import { CustomImagePicker } from "./CustomImagePicker";
import { FormField } from "./FormField";
import { SetList } from "./Workouts/SetList/SetList";
import { WorkoutCarousel } from "./Workouts/WorkoutCarousel/WorkoutCarousel";
import { FieldErrors } from "react-hook-form";

export const TemplateModal: FC<{}> = () => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useWorkoutFormContext().form;

  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Error occurred", errors);
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
            uri={getValues("image")}
          />
        </View>
        <WorkoutCarousel />
        <SetList isWorkout={true} />
        <CustomButton
          title="Create Template"
          handlePress={handleSubmit(onSubmit, onError)}
        />
      </View>
    </ScrollView>
  );
};
