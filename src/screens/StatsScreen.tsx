import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { FC, useState } from "react";
import { ScrollView, View } from "react-native";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { Chart } from "../components/Statistics/Chart";
import { Exercise } from "../entities/exercise.entity";

export const Stats: FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );

  return (
    <ScrollView className="bg-primary h-full">
      <CustomButton
        title="View Exercise Results"
        handlePress={() =>
          navigation.navigate("Exercises", {
            onSelect: (exercise: Exercise) => setSelectedExercise(exercise),
          })
        }
      />
      <View className="mt-4">
        <Chart exercise={selectedExercise} />
      </View>
    </ScrollView>
  );
};
