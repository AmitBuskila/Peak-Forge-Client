import React, { FC, useEffect } from "react";
import { Path, useWatch } from "react-hook-form";
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
  const { setValue, getValues, control } = useWorkoutFormContext().form;
  const exerciseSetsPath: Path<FormValues> = `exercises.${exerciseIndex}.sets`;
  const sets = useWatch({ control, name: exerciseSetsPath });
  const [isMainSetType] = useWorkoutFormContext().isMainSet;

  useEffect(() => {
    setValue(exerciseSetsPath, getValues(exerciseSetsPath));
  }, [exerciseIndex, isMainSetType]);

  const append = (set: FormWorkoutSet) => {
    setValue(exerciseSetsPath, [...getValues(exerciseSetsPath), set]);
  };

  const remove = (key: number) => {
    setValue(
      exerciseSetsPath,
      getValues(exerciseSetsPath).filter((field) => +field.key !== key)
    );
  };

  const handleEmptyElementPress = () => {
    const newSet: Partial<FormWorkoutSet> = {
      key: new Date().getTime().toString(),
      isSecondary: !isMainSetType,
    };
    append(newSet as FormWorkoutSet);
  };

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

  return (
    <SwipeListView
      ListHeaderComponent={<SetHeader isWorkout={isWorkout} />}
      data={sets.filter((set) =>
        isMainSetType ? !set.isSecondary : set.isSecondary
      )}
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
          setIndex={
            isMainSetType
              ? index
              : sets.filter((set) => !set.isSecondary).length + index
          }
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
