import { useWatch } from "react-hook-form";
import { View } from "react-native";
import { useWorkoutFormContext } from "../../contexts/WorkoutForm.context";
import { useSetListAnimation } from "../../hooks/setAnimation.hook";
import { SetList } from "./SetList/SetList";
import { WorkoutCarousel } from "./WorkoutCarousel/WorkoutCarousel";
import { FC, useEffect } from "react";
import { Workout } from "../../../types/template";
import Animatable from "react-native-reanimated";
import { formatWorkoutToFormValues } from "../../utils/formatActions";

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
      <View>
        {!!exercises[exerciseIndex]?.sets && (
          <Animatable.View style={animatedStyle}>
            <SetList isWorkout={!!workout} exerciseIndex={exerciseIndex} />
          </Animatable.View>
        )}
      </View>
    </View>
  );
};
