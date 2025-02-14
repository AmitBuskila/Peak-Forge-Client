import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { FlatList, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { Exercise } from "../../types/template";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { ExerciseItem } from "../components/Workouts/ExerciseItem";
import {
  FormWorkoutSet,
  useWorkoutFormContext,
} from "../contexts/WorkoutForm.context";
import { useAppContext } from "../contexts/AppContext.context";

export const SearchExercisesScreen: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { control } = useWorkoutFormContext().form;
  const navigation = useNavigation<NavigationProp<string>>();
  const { append, fields } = useFieldArray({
    control,
    name: "exercises",
  });
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [activeWorkout] = useAppContext().activeWorkout;

  const exercises = [
    { label: "Bench press" },
    { label: "Squats" },
    { label: "Bicep curls" },
    { label: "Cable rows" },
  ];

  const handleConfirm = () => {
    if (selectedExercise) {
      append({
        key: ((fields?.length ?? 0) + 1).toString(),
        label: selectedExercise.label,
        imageUri:
          "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
        sets: [{ key: "1" } as FormWorkoutSet],
      });
      navigation.goBack();
      modalRef.current?.snapToIndex(3);
    }
  };

  return (
    <View className="bg-primary h-full">
      <SearchBar
        lightTheme={false}
        placeholder="Search here"
        containerStyle={{
          backgroundColor: "#1E1E2D",
          height: 80,
        }}
        inputContainerStyle={{
          backgroundColor: "#CDCDE0",
          borderRadius: 12,
          height: 60,
        }}
        inputStyle={{ color: "black" }}
        onChangeText={setSearchValue}
        value={searchValue}
      />
      <FlatList
        data={exercises.filter((exercise) =>
          exercise.label
            .toLocaleLowerCase()
            .includes(searchValue.toLocaleLowerCase())
        )}
        keyExtractor={(item) => item.label}
        renderItem={({ item }) => (
          <ExerciseItem
            exercise={item as any}
            onPress={setSelectedExercise}
            selected={selectedExercise?.label || null}
          />
        )}
      />
      <View className={!!activeWorkout ? "mb-20" : "mb-2"}>
        <CustomButton
          title="Confirm"
          handlePress={handleConfirm}
          disabled={!selectedExercise}
        />
      </View>
    </View>
  );
};
