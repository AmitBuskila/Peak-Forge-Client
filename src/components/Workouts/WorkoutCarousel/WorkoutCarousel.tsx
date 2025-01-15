import React, { useState } from "react";
import { useFieldArray } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { screenWidth } from "../../../../constants";
import {
  Exercise,
  useWorkoutFormContext,
} from "../../../contexts/WorkoutForm.context";
import { EmptyElement } from "../../EmptyElement";
import { WorkoutImage } from "./WorkoutImage";

export const WorkoutCarousel = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useWorkoutFormContext().form;

  const [currExerciseIndex, setCurrExerciseIndex] =
    useWorkoutFormContext().currExerciseIndex;

  const { append, fields, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const data: Exercise[] = [
    ...fields,
    { key: "0", imageUri: "", label: "", sets: [] },
  ];

  const handleEmptyElementPress = () => {
    append({
      key: (fields.length + 1).toString(),
      label: "bench",
      imageUri:
        "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
      sets: [],
    });
  };

  return (
    <Carousel
      width={screenWidth}
      style={{ minHeight: 250 }}
      panGestureHandlerProps={{
        activeOffsetX: [-10, 10],
      }}
      data={data}
      loop={false}
      scrollAnimationDuration={1000}
      onSnapToItem={(index) => setCurrExerciseIndex(index)}
      renderItem={({ index, item }) => {
        if (item?.key === "0") {
          return (
            <EmptyElement
              width={65}
              height={248}
              handlePress={handleEmptyElementPress}
            />
          );
        } else {
          return <WorkoutImage index={index} item={item} />;
        }
      }}
      withAnimation={{ type: "timing", config: { duration: 600 } }}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  text: {
    fontSize: 20,
    marginBottom: 20,
    color: "#764ABC",
  },
  card: {
    backgroundColor: "#764ABC",
    borderRadius: 10,
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    width: screenWidth - 40,
    marginHorizontal: 20,
    height: 200,
  },
  title: {
    fontSize: 24,
    color: "white",
  },
});
