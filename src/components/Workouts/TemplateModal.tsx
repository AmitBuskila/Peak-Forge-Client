import React, { FC } from "react";
import { FieldErrors, useWatch } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import Animated from "react-native-reanimated";
import {
  FormValues,
  useWorkoutFormContext,
} from "../../contexts/WorkoutForm.context";
import { useSetListAnimation } from "../../hooks/setAnimation.hook";
import { CustomButton } from "../GenericComponents/CustomButton";
import { CustomImagePicker } from "../GenericComponents/CustomImagePicker";
import { FormField } from "../GenericComponents/FormField";
import { SetList } from "./SetList/SetList";
import { WorkoutCarousel } from "./WorkoutCarousel/WorkoutCarousel";
import { useDispatch } from "react-redux";
import { formatWorkoutTemplate } from "../../utils/formatActions";
import { addWorkoutTemplate } from "../../store/slices/WorkoutSlice";
import { Workout } from "../../../types/template";

export const TemplateModal: FC<{}> = () => {
  const {
    control,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useWorkoutFormContext().form;
  const dispatch = useDispatch();

  const [exerciseIndex] = useWorkoutFormContext().currExerciseIndex;

  const exercises = useWatch({ control, name: "exercises" });

  const onSubmit = (data: FormValues) => {
    const workout: Workout = formatWorkoutTemplate(data);
    dispatch(addWorkoutTemplate(workout));
  };

  const onError = (errors: FieldErrors<FormValues>) => {
    console.log("Error occurred", errors);
  };

  const animatedStyle = useSetListAnimation({ exerciseIndex, exercises });

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
              setImageUri={setValue}
              uri={getValues("image")}
            />
          </View>
          <View
            style={{
              marginVertical: 12,
              display: "flex",
              margin: "auto",
            }}
          >
            <WorkoutCarousel />
            {!!exercises[exerciseIndex]?.sets && (
              <Animated.View style={animatedStyle}>
                <SetList isWorkout={false} exerciseIndex={exerciseIndex} />
              </Animated.View>
            )}
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
