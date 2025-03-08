import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { FlatList, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { ExerciseItem } from "../components/Workouts/ExerciseItem";
import { useAppContext } from "../contexts/AppContext.context";
import {
  FormWorkoutSet,
  useWorkoutFormContext,
} from "../contexts/WorkoutForm.context";
import { Exercise as ExerciseEntity } from "../entities/exercise.entity";
import { useGetExercisesQuery } from "../store/apis/serverApi";

export const SearchExercisesScreen: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const { control } = useWorkoutFormContext().form;
  const navigation = useNavigation<NavigationProp<string>>();
  const { append, fields } = useFieldArray({
    control,
    name: "exercises",
  });
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseEntity | null>(null);
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [activeWorkout] = useAppContext().activeWorkout;
  const { data: exercises } = useGetExercisesQuery();

  const handleConfirm = () => {
    if (selectedExercise) {
      append({
        key: selectedExercise.id.toString(),
        label: selectedExercise.name,
        imageUri: selectedExercise.image,
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
      {exercises ? (
        <FlatList
          data={exercises.filter((exercise) =>
            exercise.name
              .toLocaleLowerCase()
              .includes(searchValue.toLocaleLowerCase())
          )}
          keyExtractor={(item) => item.name}
          renderItem={({ item }) => (
            <ExerciseItem
              exercise={item}
              onPress={setSelectedExercise}
              selected={selectedExercise?.name || null}
            />
          )}
        />
      ) : (
        <View />
      )}
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
