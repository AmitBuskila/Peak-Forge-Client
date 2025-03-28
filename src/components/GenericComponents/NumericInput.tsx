import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Haptics from "expo-haptics";
import React, { FC } from "react";
import { Path, useWatch } from "react-hook-form";
import { TextInput, View } from "react-native";
import { useAppContext } from "../../contexts/AppContext.context";
import {
  FormExercise,
  FormWorkoutSet,
  useWorkoutFormContext,
} from "../../contexts/WorkoutForm.context";
import { timeStringToSeconds } from "../Workouts/Countdown";

export const NumericInput: FC<{
  fieldType: Path<FormWorkoutSet>;
  exerciseIndex: number;
  setIndex: number;
}> = ({ fieldType: fieldType, exerciseIndex, setIndex }) => {
  const { control, setValue, getValues } = useWorkoutFormContext().form;
  const exercisesState: FormExercise[] = useWatch({
    control,
    name: `exercises`,
  });
  const [_, setTimer] = useAppContext().timer;

  const handleLogRepsDone = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    const restTime: number = timeStringToSeconds(
      exercisesState[exerciseIndex]?.timer || "1:00"
    );
    setTimer((prev) => ({ key: prev.key + 1, duration: restTime }));
    AsyncStorage.setItem("workoutData", JSON.stringify(getValues()));
  };

  return (
    <View>
      {exercisesState[exerciseIndex].sets[setIndex] && (
        <TextInput
          value={(
            parseFloat(
              exercisesState[exerciseIndex].sets[setIndex][
                fieldType
              ]?.toString() || ""
            ) || ""
          ).toString()}
          onChangeText={(value) => {
            setValue(
              `exercises.${exerciseIndex}.sets.${setIndex}.${fieldType}`,
              value
            );
            if (fieldType === "done") {
              handleLogRepsDone();
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
