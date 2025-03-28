import { FC } from "react";
import { useWatch } from "react-hook-form";
import { View } from "react-native";
import Animatable from "react-native-reanimated";
import { useWorkoutFormContext } from "../../contexts/WorkoutForm.context";
import { Template } from "../../entities/template.entity";
import { useSetListAnimation } from "../../hooks/setAnimation.hook";
import { useInitializeForm } from "../../hooks/workout.hooks";
import { FormField } from "../GenericComponents/FormField";
import { ToggleSwitch } from "../GenericComponents/Switch";
import { SetList } from "./SetList/SetList";
import { TimerPicker } from "./WorkoutCarousel/TimerPicker";
import { WorkoutCarousel } from "./WorkoutCarousel/WorkoutCarousel";

export const WorkoutRoutine: FC<{ template?: Template }> = ({ template }) => {
  const [exerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const { control } = useWorkoutFormContext().form;
  const [isMainSetType, setIsMainSetType] = useWorkoutFormContext().isMainSet;
  const exercises = useWatch({ control, name: "exercises" });
  const animatedStyle = useSetListAnimation({ exerciseIndex, exercises });
  useInitializeForm(template);

  return (
    <View>
      <WorkoutCarousel />
      {!!exercises[exerciseIndex]?.sets && (
        <View>
          <Animatable.View style={animatedStyle}>
            <View className="w-[95vw] mx-auto flex-row justify-around">
              <TimerPicker />
              <ToggleSwitch
                isOn={isMainSetType}
                setIsOn={setIsMainSetType}
                sets={exercises[exerciseIndex]?.sets}
              />
            </View>
            <View className="mx-auto my-2">
              <FormField
                control={control}
                controlName={`exercises.${exerciseIndex}.notes`}
                controlledValue={exercises[exerciseIndex]?.notes || ""}
                title="notes"
                isHeader={false}
                styles="w-[85vw] h-14"
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
