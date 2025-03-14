import React, { FC, useEffect, useState } from "react";
import { Path } from "react-hook-form";
import { TouchableOpacity, View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {
  FormValues,
  FormWorkoutSet,
  useWorkoutFormContext,
} from "../../../contexts/WorkoutForm.context";
import { EmptyElement } from "../../GenericComponents/EmptyElement";
import { SetHeader } from "./SetHeader";
import { SetItem } from "./SetItem";

export const SetList: FC<{
  isWorkout: boolean;
  exerciseIndex: number;
}> = ({ isWorkout, exerciseIndex }) => {
  const { setValue, getValues } = useWorkoutFormContext().form;
  const exerciseSetsPath: Path<FormValues> = `exercises.${exerciseIndex}.sets`;
  const [fields, setFields] = useState<FormWorkoutSet[]>(
    getValues(exerciseSetsPath)
  );

  const append = (set: FormWorkoutSet) => {
    const newSets: FormWorkoutSet[] = [...getValues(exerciseSetsPath), set];
    setValue(exerciseSetsPath, newSets);
    setFields(newSets);
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
    const newSet: Partial<FormWorkoutSet> = {
      key: new Date().getTime().toString(),
    };
    append(newSet as FormWorkoutSet);
  };

  return (
    <SwipeListView
      ListHeaderComponent={<SetHeader isWorkout={isWorkout} />}
      data={fields}
      keyExtractor={(item) => item.key}
      useAnimatedList={true}
      ListFooterComponent={
        <EmptyElement
          width={93}
          height={57}
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
