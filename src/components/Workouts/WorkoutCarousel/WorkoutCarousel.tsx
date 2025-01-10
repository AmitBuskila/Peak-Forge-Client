import React, { useState } from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { screenWidth } from "../../../../constants";
import { WorkoutImage } from "./WorkoutImage";
import {
  Exercise,
  useWorkoutFormContext,
} from "../../../contexts/WorkoutForm.context";
import { Text, Pressable } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useWatch } from "react-hook-form";
import { EmptyElement } from "../../EmptyElement";

export const WorkoutCarousel = () => {
  const {
    control,
    watch,
    setValue,
    getValues,
    handleSubmit,
    formState: { errors },
  } = useWorkoutFormContext();

  const exercisesState = useWatch({
    control,
    name: "exercises",
  });

  const handleEmptyElementPress = () => {
    setValue("exercises", [
      ...exercisesState,
      {
        key: (exercisesState.length + 1).toString(),
        label: "bench",
        imageUri:
          "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
        sets: [],
      },
    ]);
  };

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        className="mt-3"
        data={exercisesState}
        onEndReachedThreshold={0.001}
        onDragEnd={({ data }) => {
          setValue("exercises", data);
        }}
        keyExtractor={(item) => item.key}
        renderItem={WorkoutImage}
        horizontal
        snapToInterval={screenWidth * 0.82}
        decelerationRate={"fast"}
        animationConfig={{ duration: 500 }} //todo improve animation
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          <EmptyElement
            width="65"
            height="248"
            handlePress={handleEmptyElementPress}
          />
        }
      />
    </GestureHandlerRootView>
  );
};
