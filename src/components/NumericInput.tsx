import React, { FC } from "react";
import { Controller, useWatch } from "react-hook-form";
import { TextInput, View } from "react-native";
import {
  Exercise,
  Set,
  useWorkoutFormContext,
} from "../contexts/WorkoutForm.context";

export const NumericInput: FC<{
  fieldType: keyof Set;
  exerciseIndex: number;
  setIndex: number;
}> = ({ fieldType: fieldType, exerciseIndex, setIndex }) => {
  const { control } = useWorkoutFormContext().form;

  const exercisesState: Exercise[] = useWatch({
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
              value={
                exercisesState[exerciseIndex].sets[setIndex][
                  fieldType
                ]?.toString() || ""
              }
              onChangeText={onChange}
              onBlur={onBlur}
              maxLength={3}
              keyboardType="number-pad"
              className={`border-2 border-${fieldType === "done" ? "secondary" : "black"}-200  bg-primary rounded-xl
           focus:border-secondary items-center text-center text-gray-100 w-12`}
            />
          )}
        />
      )}
    </View>
  );
};
