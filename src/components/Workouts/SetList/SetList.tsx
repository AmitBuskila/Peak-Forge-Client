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
    getValues(exerciseSetsPath).filter((set) =>
      isMainSetType ? !set.isSecondary : set.isSecondary
    )
  );

  const [isMainSetType] = useWorkoutFormContext().isMainSet;

  const append = (set: FormWorkoutSet) => {
    setFields((sets) => [...sets, set]);
    setValue(exerciseSetsPath, [...getValues(exerciseSetsPath), set]);
  };

  const remove = (key: number) => {
    setFields((sets) => sets.filter((field) => +field.key !== key));
    setValue(
      exerciseSetsPath,
      getValues(exerciseSetsPath).filter((field) => +field.key !== key)
    );
  };

  useEffect(() => {
    const currentSets = getValues(exerciseSetsPath).filter((set) =>
      isMainSetType ? !set.isSecondary : set.isSecondary
    );
    setFields(currentSets);
  }, [exerciseIndex, isMainSetType]);

  const renderHiddenItem = ({ key }: { key: number }) => (
    <View className="flex flex-row justify-end items-center bg-red-500 h-full rounded-lg">
      <TouchableOpacity
        className="flex justify-center items-center h-full w-[15%]"
        onPress={() => {
          remove(key);
        }}
      >
        <Icon name="trash-can-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  const handleEmptyElementPress = () => {
    const newSet: Partial<FormWorkoutSet> = {
      key: new Date().getTime().toString(),
      isSecondary: !isMainSetType,
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
      renderHiddenItem={({ item }) => renderHiddenItem({ key: +item.key })}
      rightOpenValue={-60}
      scrollEnabled={false}
    />
  );
};
