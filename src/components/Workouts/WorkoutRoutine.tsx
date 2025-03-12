import { FC, useEffect } from "react";
import { useWatch } from "react-hook-form";
import { View } from "react-native";
import Animatable from "react-native-reanimated";
import { useWorkoutFormContext } from "../../contexts/WorkoutForm.context";
import { Template } from "../../entities/template.entity";
import { Workout } from "../../entities/workout.entity";
import { useSetListAnimation } from "../../hooks/setAnimation.hook";
import { useLazyGetLatestWorkoutQuery } from "../../store/apis/serverApi";
import { formatWorkoutToFormValues } from "../../utils/formatActions";
import { FormField } from "../GenericComponents/FormField";
import { SetList } from "./SetList/SetList";
import { TimerPicker } from "./WorkoutCarousel/TimerPicker";
import { WorkoutCarousel } from "./WorkoutCarousel/WorkoutCarousel";

export const WorkoutRoutine: FC<{ template?: Template }> = ({ template }) => {
  const [exerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const { control, setValue } = useWorkoutFormContext().form;
  const exercises = useWatch({ control, name: "exercises" });
  const animatedStyle = useSetListAnimation({ exerciseIndex, exercises });
  const [getLatestWorkout] = useLazyGetLatestWorkoutQuery();

  useEffect(() => {
    (async () => {
      if (template) {
        const latestWorkout = await getLatestWorkout(template.id).unwrap();
        setValue(
          "exercises",
          template
            ? formatWorkoutToFormValues(template, latestWorkout).exercises
            : []
        );
      }
    })();
  }, [template]);

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
            <SetList isWorkout={!!template} exerciseIndex={exerciseIndex} />
          </Animatable.View>
        </View>
      )}
    </View>
  );
};
