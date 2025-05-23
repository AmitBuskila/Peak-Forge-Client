import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { FC, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { FlatList, View } from "react-native";
import { SearchBar } from "react-native-elements";
import { useSelector } from "react-redux";
import { ClickChip } from "../components/GenericComponents/ClickChip";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { ExerciseItem } from "../components/Workouts/ExerciseItem";
import { useAppContext } from "../contexts/AppContext.context";
import {
  FormWorkoutSet,
  useWorkoutFormContext,
} from "../contexts/WorkoutForm.context";
import { Exercise as ExerciseEntity } from "../entities/exercise.entity";
import { UserSliceState } from "../store/slices/UserSlice";
import { ScrollView } from "react-native-gesture-handler";
import { muscles } from "../../constants";

export const SearchExercisesScreen: FC = () => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [selectedMuscle, setSelectedMuscle] = useState<string | null>(null);
  const { control } = useWorkoutFormContext().form;
  const navigation = useNavigation<NavigationProp<string>>();
  const { fields } = useFieldArray({
    control,
    name: "exercises",
  });
  const [selectedExercise, setSelectedExercise] =
    useState<ExerciseEntity | null>(null);
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [activeWorkout] = useAppContext().activeWorkout;
  const exercises = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.exercises
  );
  const route = useRoute();
  const { onSelect } = route.params as {
    onSelect: (exercise: ExerciseEntity) => void;
  };

  const handleConfirm = () => {
    if (selectedExercise) {
      onSelect(selectedExercise);
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
      <ScrollView horizontal className="flex-row h-[8vh]">
        {muscles.map((muscle) => (
          <ClickChip
            key={muscle}
            title={muscle}
            color={selectedMuscle !== muscle ? "#1E1E2D" : "#7448ac"}
            onClick={() =>
              setSelectedMuscle(selectedMuscle === muscle ? null : muscle)
            }
          />
        ))}
      </ScrollView>
      {exercises ? (
        <FlatList
          className="h-[80vh]"
          data={exercises.filter(
            (exercise) =>
              exercise.name
                .toLocaleLowerCase()
                .includes(searchValue.toLocaleLowerCase()) &&
              !fields.find(
                (currentExercise) => +currentExercise.key === exercise.id
              ) &&
              (exercise.primaryMuscle === selectedMuscle ||
                exercise.secondaryMuscle === selectedMuscle ||
                !selectedMuscle)
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
