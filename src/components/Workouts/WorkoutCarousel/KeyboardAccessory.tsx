import { FC, useEffect } from "react";
import { Button, Keyboard, View } from "react-native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { useWorkoutFormContext } from "../../../contexts/WorkoutForm.context";

export const KeyboardAccessory: FC = () => {
  const carouselRef = useWorkoutFormContext().carouselRef;
  const textInputRefs = useWorkoutFormContext().textInputRefs;
  const [currSetIndex] = useWorkoutFormContext().currSetIndex;
  const [currExerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const nextExerciseTextInput = textInputRefs?.[currExerciseIndex]?.[0];

  // todo trigger it only on ref driven scroll,(not user driven)
  useEffect(() => {
    if (
      currSetIndex === 0 &&
      !!nextExerciseTextInput &&
      nextExerciseTextInput?.isReady
    ) {
      nextExerciseTextInput?.ref?.current?.focus();
    }
  }, [currExerciseIndex, nextExerciseTextInput, currSetIndex]);

  return (
    <KeyboardAccessoryView>
      <View className="z-10 bg-gray-100 w-full opacity-95 ">
        <Button
          title="Go to next"
          color={"#48138b"}
          onPress={() => {
            const nextTextInput =
              textInputRefs[currExerciseIndex][currSetIndex + 1]?.ref?.current;

            if (nextTextInput) {
              nextTextInput.focus();
            } else {
              carouselRef?.current?.next();
              Keyboard.dismiss();
            }
          }}
        />
      </View>
    </KeyboardAccessoryView>
  );
};
