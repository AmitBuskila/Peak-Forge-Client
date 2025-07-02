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
import { schedulePushNotification } from "../../utils/notifications";
import { timeStringToSeconds } from "../Workouts/Countdown";

export const NumericInput: FC<{
  fieldType: Path<FormWorkoutSet>;
  exerciseIndex: number;
  setIndex: number;

  float?: boolean;
  displayIndex?: number;
}> = ({
  fieldType: fieldType,
  exerciseIndex,
  setIndex,
  float = false,
  displayIndex = -1,
}) => {
  const { control, setValue, getValues } = useWorkoutFormContext().form;
  const [isMainSetType] = useWorkoutFormContext().isMainSet;
  const textInputRef =
    useWorkoutFormContext().textInputRefs[exerciseIndex][setIndex];
  const exercisesState: FormExercise[] = useWatch({
    control,
    name: `exercises`,
  });
  const [__, setTimer] = useAppContext().timer;
  const currentSets = exercisesState[exerciseIndex].sets.filter(
    (set) => set.isSecondary === !isMainSetType
  );

  const [_, setCurrSetIndex] = useWorkoutFormContext().currSetIndex;

  const handleLogRepsDone = (value: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Heavy);
    if (value) {
      if (
        exercisesState.length - 1 === exerciseIndex &&
        currentSets.length - 1 === displayIndex
      )
        return;
      const restTime: number = timeStringToSeconds(
        exercisesState[exerciseIndex]?.timer || "0:00"
      );
      setTimer((prev) => ({
        key: restTime ? prev.key + 1 : 0,
        duration: restTime,
      }));
      AsyncStorage.setItem("workoutData", JSON.stringify(getValues()));
      const nextExerciseIndex: number =
        currentSets.length - 1 === displayIndex
          ? exerciseIndex + 1
          : exerciseIndex;
      schedulePushNotification(
        new Date().getTime() + restTime * 1000,
        exercisesState[nextExerciseIndex]?.label
      );
    }
  };

  return (
    <View>
      {exercisesState[exerciseIndex].sets[setIndex] && (
        <View>
          <TextInput
            ref={(node) => {
              textInputRef.isReady = !!node;
              textInputRef.ref.current = node;
            }}
            onFocus={() => setCurrSetIndex(setIndex)}
            onBlur={() => setCurrSetIndex(-2)}
            value={exercisesState[exerciseIndex].sets[setIndex][
              fieldType
            ]?.toString()}
            onChangeText={(value) => {
              setValue(
                `exercises.${exerciseIndex}.sets.${setIndex}.${fieldType}`,
                value
              );
              if (fieldType === "done") {
                handleLogRepsDone(value);
              }
            }}
            maxLength={5}
            keyboardType={float ? "decimal-pad" : "number-pad"}
            className={`border-2 border-${fieldType === "done" ? "secondary" : "black"}-200  bg-primary rounded-xl
              focus:border-secondary items-center text-center text-gray-100 w-16 py-1.5`}
          />
        </View>
      )}
    </View>
  );
};
