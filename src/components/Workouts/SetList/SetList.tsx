import { FC, useEffect, useState } from "react";
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
  index: number;
}> = ({ isWorkout, index }) => {
  const { setValue, getValues } = useWorkoutFormContext().form;
  const [fields, setFields] = useState<Set[]>([]);

  const append = (set: Set) => {
    const newSets: Set[] = [...fields, set];
    setFields(newSets);
    setValue(`exercises.${index}.sets`, newSets);
  };

  const remove = (indexToRemove: number) => {
    const newSets = fields.filter((field, index) => index !== indexToRemove);
    setFields(newSets);
    setValue(`exercises.${index}.sets`, newSets);
  };

  useEffect(() => {
    setFields((getValues(`exercises.${index}.sets`) ?? []) as Set[]);
  }, [index]);

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
    const newSet: Set = { key: (fields.length + 1).toString() };
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
