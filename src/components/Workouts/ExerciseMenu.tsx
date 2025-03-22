import React, { forwardRef } from "react";
import { Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useWorkoutFormContext } from "../../contexts/WorkoutForm.context";

export const ExerciseMenu = forwardRef<Menu, any>((_, ref) => {
  const { setValue, getValues } = useWorkoutFormContext().form;
  const [currentExerciseIndex, setCurrExerciseIndex] =
    useWorkoutFormContext().currExerciseIndex;

  return (
    <Menu ref={ref} style={{ width: 10 }}>
      <MenuTrigger />
      <MenuOptions
        customStyles={{
          optionsContainer: {
            borderRadius: 10,
            backgroundColor: "whitesmoke",
            width: 85,
          },
        }}
      >
        <MenuOption
          onSelect={() => {
            setValue(
              "exercises",
              getValues("exercises").filter(
                (_, index) => index !== currentExerciseIndex
              )
            );
          }}
        >
          <Text className="font-bold">Remove</Text>
        </MenuOption>
        <MenuOption onSelect={() => {}}>
          <Text className="text-blue-500 font-bold">Reorder</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
});
