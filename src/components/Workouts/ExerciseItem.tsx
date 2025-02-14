import { Dispatch, FC, SetStateAction } from "react";
import { Image, Pressable, Text } from "react-native";
import { Exercise } from "../../../types/template";

export const ExerciseItem: FC<{
  onPress: Dispatch<SetStateAction<Exercise | null>>;
  exercise: Exercise;
  selected: string | null;
}> = ({ exercise, onPress, selected }) => {
  const { label } = exercise;
  return (
    <Pressable
      className={`border border-gray-100 rounded-lg p-1 flex-row justify-between items-center
         ${selected === label ? "bg-gray-100" : ""}`}
      onPress={() => onPress(exercise)}
    >
      <Image
        className="h-20 w-20 rounded-lg"
        source={{
          uri:
            exercise?.imageUri ||
            "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
        }}
      />
      <Text className="text-white font-pblack mr-3">{label}</Text>
    </Pressable>
  );
};
