import { Dispatch, FC, SetStateAction } from "react";
import { Image, Pressable, Text } from "react-native";
import { Exercise as ExerciseEntity } from "../../entities/exercise.entity";

export const ExerciseItem: FC<{
  onPress: Dispatch<SetStateAction<ExerciseEntity | null>>;
  exercise: ExerciseEntity;
  selected: string | null;
}> = ({ exercise, onPress, selected }) => {
  const { name } = exercise;
  return (
    <Pressable
      className={`border border-gray-100 rounded-lg p-1 flex-row justify-between items-center
         ${selected === name ? "bg-gray-100" : ""}`}
      onPress={() => onPress(exercise)}
    >
      <Image
        className="h-20 w-20 rounded-lg"
        source={{
          uri:
            exercise?.image ||
            "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
        }}
      />
      <Text className="text-white font-pblack mr-3">{name}</Text>
    </Pressable>
  );
};
