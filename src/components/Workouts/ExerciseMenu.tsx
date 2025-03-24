import React, { forwardRef, useState } from "react";
import { Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useWorkoutFormContext } from "../../contexts/WorkoutForm.context";
import { ReorderExercisesModal } from "./WorkoutCarousel/ReorderExercisesModal";

export const ExerciseMenu = forwardRef<Menu, any>((_, ref) => {
  const { setValue, getValues } = useWorkoutFormContext().form;
  const [currentExerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const [isModalVisible, setIsModalVisible] = useState(false);

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
        <MenuOption onSelect={() => setIsModalVisible(true)}>
          <Text className="text-blue-500 font-bold">Reorder</Text>
        </MenuOption>
      </MenuOptions>
      <ReorderExercisesModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </Menu>
  );
});
