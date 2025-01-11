import { FC, useState } from "react";
import { useFieldArray } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useWorkoutFormContext } from "../../../contexts/WorkoutForm.context";
import { EmptyElement } from "../../EmptyElement";
import { SetHeader } from "./SetHeader";
import { SetItem } from "./SetItem";

const templateHeaders: string[] = ["Set", "Weight", "Rep Range"];
const workoutHeaders: string[] = [
  "Set",
  "Previous",
  "Weight",
  "Rep Range",
  "Done",
];

export const SetList: FC<{ isWorkout: boolean }> = ({ isWorkout }) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useWorkoutFormContext().form;

  const [selectedExercise, setSelectedExercise] =
    useWorkoutFormContext().selectedExercise;

  const { fields, append } = useFieldArray({
    control,
    name: `exercises.${Number(selectedExercise?.key) ?? 0}.sets`,
  });

  const headers: string[] = isWorkout ? workoutHeaders : templateHeaders;
  const [data, setData] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      key: `${index}`,
      text: `Set ${index + 1}`,
    }))
  );

  const deleteRow = (rowKey: string) => {
    const newData = data.filter((item) => item.key !== rowKey);
    setData(newData);
  };

  const renderHiddenItem = (data: any) => (
    <View className="flex flex-row justify-end items-center bg-red-500 h-full">
      <TouchableOpacity
        className="flex justify-center items-center h-full w-[15%]"
        onPress={() => deleteRow(data.item.key)}
      >
        <Icon name="trash-can-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const handleEmptyElementPress = () => {
    if (selectedExercise) {
      append({ key: (fields.length + 1).toString() });
    }
  };

  return (
    <SwipeListView
      ListHeaderComponent={SetHeader}
      data={fields}
      ListFooterComponent={
        <EmptyElement
          width={70}
          height={57}
          handlePress={handleEmptyElementPress}
        />
      }
      renderItem={SetItem}
      disableRightSwipe
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-60}
      scrollEnabled={false}
    />
  );
};
