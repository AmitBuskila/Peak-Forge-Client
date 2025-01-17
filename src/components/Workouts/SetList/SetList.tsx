import React, { FC, useEffect, useState } from "react";
import { TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  Set,
  useWorkoutFormContext,
} from "../../../contexts/WorkoutForm.context";
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

export const SetList: FC<{
  isWorkout: boolean;
  exerciseIndex: number;
}> = ({ isWorkout, exerciseIndex }) => {
  const { setValue, getValues } = useWorkoutFormContext().form;
  const [fields, setFields] = useState<Set[]>(
    getValues(`exercises.${exerciseIndex}.sets`)
  );

  const append = (set: Set) => {
    const newSets: Set[] = [...fields, set];
    setFields(newSets);
    setValue(`exercises.${exerciseIndex}.sets`, newSets);
  };

  const remove = (indexToRemove: number) => {
    const newSets = fields.filter((field, index) => index !== indexToRemove);
    setFields(newSets);
    setValue(`exercises.${exerciseIndex}.sets`, newSets);
  };

  useEffect(() => {
    const currentSets = getValues(`exercises.${exerciseIndex}.sets`);
    setFields(currentSets);
  }, [exerciseIndex]);

  const headers: string[] = isWorkout ? workoutHeaders : templateHeaders;

  const renderHiddenItem = ({ index }: { index: number }) => (
    <View className="flex flex-row justify-end items-center bg-red-500 h-full rounded-lg">
      <TouchableOpacity
        className="flex justify-center items-center h-full w-[15%]"
        onPress={() => {
          remove(index);
        }}
      >
        <Icon name="trash-can-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const handleEmptyElementPress = () => {
    const newSet: Set = { key: ((fields?.length ?? 0) + 1).toString() };
    append(newSet);
  };

  return (
    <SwipeListView
      ListHeaderComponent={<SetHeader isWorkout={isWorkout} />}
      data={fields}
      keyExtractor={(item) => item.key}
      useAnimatedList={true}
      ListFooterComponent={
        <EmptyElement
          width={15}
          height={57}
          marginLeft={"38%"}
          handlePress={handleEmptyElementPress}
        />
      }
      renderItem={({ item, index }) => (
        <SetItem
          item={item}
          setIndex={index}
          exerciseIndex={exerciseIndex}
          isWorkout={isWorkout}
        />
      )}
      disableRightSwipe
      renderHiddenItem={renderHiddenItem}
      rightOpenValue={-60}
      scrollEnabled={false}
    />
  );
};
