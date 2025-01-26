import { FC, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { View } from "react-native";
import Animatable from "react-native-reanimated";
import { Workout } from "../../../types/template";
import { useWorkoutFormContext } from "../../contexts/WorkoutForm.context";
import { useSetListAnimation } from "../../hooks/setAnimation.hook";
import { formatWorkoutToFormValues } from "../../utils/formatActions";
import { SetList } from "./SetList/SetList";
import { WorkoutCarousel } from "./WorkoutCarousel/WorkoutCarousel";
import { FormField } from "../GenericComponents/FormField";
import { TimerPicker } from "./WorkoutCarousel/TimerPicker";

export const WorkoutRoutine: FC<{ workout?: Workout }> = ({ workout }) => {
  const [exerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const { control, setValue } = useWorkoutFormContext().form;
  const exercises = useWatch({ control, name: "exercises" });
  const animatedStyle = useSetListAnimation({ exerciseIndex, exercises });

  useEffect(() => {
    setValue(
      "exercises",
      workout ? formatWorkoutToFormValues(workout).exercises : []
    );
  }, [workout]);

  return (
    <View>
      <WorkoutCarousel />
      {!!exercises[exerciseIndex]?.sets && (
        <View>
          <Animatable.View style={animatedStyle}>
            <View className="w-[95vw] mx-auto flex-row justify-between">
              <TimerPicker />
              <FormField
                control={control}
                controlName={`exercises.${exerciseIndex}.notes`}
                controlledValue={exercises[exerciseIndex]?.notes}
                title="notes"
                isHeader={false}
                styles="w-[45vw] h-12"
                multiline
              />
            </View>
            <SetList isWorkout={!!workout} exerciseIndex={exerciseIndex} />
          </Animatable.View>
        </View>
      )}
    </View>
  );
};
