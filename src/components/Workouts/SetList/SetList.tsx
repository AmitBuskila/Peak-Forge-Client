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

export const SetList: FC<{ isWorkout: boolean; index: number }> = ({
  isWorkout,
  index,
}) => {
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useWorkoutFormContext().form;

  const { fields, append, remove } = useFieldArray({
    control,
    name: `exercises.${index}.sets`,
  });

  const headers: string[] = isWorkout ? workoutHeaders : templateHeaders;

  const renderHiddenItem = (data: any) => (
    <View className="flex flex-row justify-end items-center bg-red-500 h-full">
      <TouchableOpacity
        className="flex justify-center items-center h-full w-[15%]"
        onPress={() => {
          remove(data.index);
        }}
      >
        <Icon name="trash-can-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const handleEmptyElementPress = () => {
    const newSet = { key: (fields.length + 1).toString() };
    append(newSet);
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
