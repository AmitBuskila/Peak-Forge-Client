import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { FC, useState } from "react";
import { Text, View } from "react-native";
import { useSelector } from "react-redux";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { Exercise } from "../entities/exercise.entity";
import { UserSliceState } from "../store/slices/UserSlice";

export const Stats: FC = () => {
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  return (
    <View className="bg-primary h-full">
      <CustomButton
        title="Choose Exercise"
        handlePress={() =>
          navigation.navigate("Exercises", {
            onSelect: (exercise: Exercise) => setSelectedExercise(exercise),
          })
        }
      />
      <Text className="text-3xl text-gray-100 font-pbold text-center mb-5">
        {selectedExercise?.name}
      </Text>
    </View>
  );
};
