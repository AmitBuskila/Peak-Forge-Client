import React from "react";
import { useFieldArray } from "react-hook-form";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { screenWidth } from "../../../../constants";
import { useWorkoutFormContext } from "../../../contexts/WorkoutForm.context";
import { EmptyElement } from "../../EmptyElement";
import { WorkoutImage } from "./WorkoutImage";

export const WorkoutCarousel = () => {
  const {
    control,
    setValue,
    formState: { errors },
  } = useWorkoutFormContext().form;

  const [selectedExercise, setSelectedExercise] =
    useWorkoutFormContext().selectedExercise;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "exercises",
  });

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
    <GestureHandlerRootView>
      <DraggableFlatList
        className="mt-3"
        data={fields}
        onEndReachedThreshold={0.001}
        onDragEnd={({ data }) => {
          setValue("exercises", data);
        }}
        onViewableItemsChanged={({ viewableItems }) => {
          if (fields.length) {
            setSelectedExercise(
              viewableItems[viewableItems.length - 1]?.item ??
                fields[fields.length - 1]
            );
          }
        }}
        viewabilityConfig={{ itemVisiblePercentThreshold: 50 }}
        keyExtractor={(item) => item.key}
        renderItem={WorkoutImage}
        horizontal
        snapToInterval={screenWidth * 0.82}
        decelerationRate={"fast"}
        animationConfig={{ duration: 500 }} //todo improve animation
        showsHorizontalScrollIndicator={false}
        ListFooterComponent={
          <EmptyElement
            width={65}
            height={248}
            handlePress={handleEmptyElementPress}
          />
        }
      />
    </GestureHandlerRootView>
  );
};
