import * as Haptics from "expo-haptics";
import React, { FC } from "react";
import { Controller, Path, useWatch } from "react-hook-form";
import { TextInput, View } from "react-native";
import {
  FormExercise,
  FormWorkoutSet,
  useWorkoutFormContext,
} from "../../contexts/WorkoutForm.context";

export const NumericInput: FC<{
  fieldType: Path<FormWorkoutSet>;
  exerciseIndex: number;
  setIndex: number;
}> = ({ fieldType: fieldType, exerciseIndex, setIndex }) => {
  const { control } = useWorkoutFormContext().form;

  const exercisesState: FormExercise[] = useWatch({
    control,
    name: `exercises`,
  });

  return (
    <View>
      {exercisesState[exerciseIndex].sets[setIndex] && (
        <Controller
          name={`exercises.${exerciseIndex}.sets.${setIndex}.${fieldType}`}
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur } }) => (
            <TextInput
              ref={null} // ref
              value={
                exercisesState[exerciseIndex].sets[setIndex][
                  fieldType
                ]?.toString() || ""
              }
              onChangeText={onChange}
              onBlur={() => {
                onBlur();
                if (fieldType === "done") {
                  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
                }
              }}
              maxLength={3}
              keyboardType="number-pad"
              className={`border-2 border-${fieldType === "done" ? "secondary" : "black"}-200  bg-primary rounded-xl
           focus:border-secondary items-center text-center text-gray-100 w-16 py-1.5`}
            />
          )}
        />
      )}
    </View>
  );
};
