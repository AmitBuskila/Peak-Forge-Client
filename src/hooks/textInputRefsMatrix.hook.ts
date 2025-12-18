import { createRef } from "react";
import { UseFormReturn, useWatch } from "react-hook-form";
import { TextInput } from "react-native";
import {
  FormExercise,
  FormValues,
  TextInputRef,
} from "../contexts/WorkoutForm.context";

export const useTextInputRefsMatrix = (
  form: UseFormReturn<FormValues>
): TextInputRef[][] => {
  const exercises: FormExercise[] = useWatch({
    control: form.control,
    name: "exercises",
  });

  return exercises.map((exercise) =>
    exercise.sets.map(() => ({
      ref: createRef<TextInput>(),
      isReady: false,
    }))
  );
};
