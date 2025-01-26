import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { FieldErrors, useWatch } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { useDispatch } from "react-redux";
import { Workout } from "../../../types/template";
import {
  FormValues,
  useWorkoutFormContext,
} from "../../contexts/WorkoutForm.context";
import { addWorkoutTemplate } from "../../store/slices/WorkoutSlice";
import { formatWorkoutTemplate } from "../../utils/formatActions";
import { CustomButton } from "../GenericComponents/CustomButton";
import { CustomImagePicker } from "../GenericComponents/CustomImagePicker";
import { FormField } from "../GenericComponents/FormField";
import { WorkoutRoutine } from "./WorkoutRoutine";

export const TemplateModal: FC<{}> = () => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useWorkoutFormContext().form;
  const dispatch = useDispatch();

  const navigation = useNavigation<NavigationProp<string>>();
  const image = useWatch({ control, name: "image" });

  const onSubmit = (data: FormValues) => {
    const workout: Workout = formatWorkoutTemplate(data);
    dispatch(addWorkoutTemplate(workout));
    navigation.navigate("Home");
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Error occurred", getValues().exercises);
  };

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={100}
      enabled
    >
      <ScrollView className="bg-primary h-full">
        <View className="w-full justify-center h-full px-4 my-4">
          <FormField
            title="Workout Name"
            controlName="workoutName"
            control={control}
            styles="w-full h-14"
          />
          <View className="my-2 flex flex-row items-center">
            <FormField
              title="Description"
              controlName="description"
              control={control}
              styles="w-[66vw] h-28"
              multiline={true}
            />
            <CustomImagePicker
              styles="w-[24vw] h-28 mx-4 mt-5"
              setImageUri={setValue}
              uri={image}
            />
          </View>
          <View className="my-6">
            <WorkoutRoutine />
          </View>

          <CustomButton
            title="Create Template"
            handlePress={handleSubmit(onSubmit, onError)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
