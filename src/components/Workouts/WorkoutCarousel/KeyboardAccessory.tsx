import { FC, useEffect } from "react";
import { Button, Keyboard, View } from "react-native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { useWorkoutFormContext } from "../../../contexts/WorkoutForm.context";
import { useState } from "react";

export const KeyboardAccessory: FC = () => {
  const carouselRef = useWorkoutFormContext().carouselRef;
  const textInputRefs = useWorkoutFormContext().textInputRefs;
  const [currSetIndex] = useWorkoutFormContext().currSetIndex;
  const [currExerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const nextExerciseTextInput = textInputRefs?.[currExerciseIndex]?.[0];
  const [isProgrammedScroll, setIsProgrammedScroll] = useState<boolean>(true);

  useEffect(() => {
    if (
      currSetIndex === 0 &&
      !!nextExerciseTextInput &&
      nextExerciseTextInput?.isReady &&
      isProgrammedScroll
    ) {
      nextExerciseTextInput?.ref?.current?.focus();
      setIsProgrammedScroll(false);
    }
  }, [
    currExerciseIndex,
    nextExerciseTextInput,
    currSetIndex,
    isProgrammedScroll,
  ]);

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
              setTimeout(() => setIsProgrammedScroll(true), 1500);
            }
          }}
        />
      </View>
    </KeyboardAccessoryView>
  );
};
