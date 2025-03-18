import * as Haptics from "expo-haptics";
import React, { FC } from "react";
import { Path, useWatch } from "react-hook-form";
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
  const { control, setValue } = useWorkoutFormContext().form;
  const [isMainSetType] = useWorkoutFormContext().isMainSet;

  const exercisesState: FormExercise[] = useWatch({
    control,
    name: `exercises`,
  });

  return (
    <View>
      {exercisesState[exerciseIndex].sets[setIndex] && (
        <TextInput
          // ref={null} todo
          value={(
            parseFloat(
              exercisesState[exerciseIndex].sets[setIndex][
                fieldType
              ]?.toString() || ""
            ) || ""
          ).toString()}
          onChangeText={(value) => {
            if (
              exercisesState[exerciseIndex]?.sets.some(
                (set) => set.isSecondary
              ) &&
              isMainSetType
            ) {
              return;
            }
            setValue(
              `exercises.${exerciseIndex}.sets.${setIndex}.${fieldType}`,
              value
            );
          }}
          onBlur={() => {
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
    </View>
  );
};
