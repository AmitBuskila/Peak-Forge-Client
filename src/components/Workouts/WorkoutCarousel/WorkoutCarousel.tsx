import React, { FC } from "react";
import { useFieldArray } from "react-hook-form";
import Carousel from "react-native-reanimated-carousel";
import { screenWidth } from "../../../../constants";
import { Workout } from "../../../../types/template";
import {
  FormExercise,
  FormWorkoutSet,
  useWorkoutFormContext,
} from "../../../contexts/WorkoutForm.context";
import { EmptyElement } from "../../GenericComponents/EmptyElement";
import { WorkoutImage } from "./WorkoutImage";
import { View } from "react-native";
import { TimerPicker } from "./TimerPicker";
import { FormField } from "../../GenericComponents/FormField";

export const WorkoutCarousel: FC<{ workout?: Workout }> = ({ workout }) => {
  const { control } = useWorkoutFormContext().form;

  const [currExerciseIndex, setCurrExerciseIndex] =
    useWorkoutFormContext().currExerciseIndex;

  const { append, fields, remove } = useFieldArray({
    control,
    name: "exercises",
  });

  const data: FormExercise[] = [
    ...fields,
    { key: "0", imageUri: "", label: "", sets: [] },
  ];

  const handleEmptyElementPress = () => {
    append({
      key: ((fields?.length ?? 0) + 1).toString(),
      label: "bench",
      imageUri:
        "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
      sets: [{ key: "1" } as FormWorkoutSet],
    });
  };

  return (
    <View>
      <Carousel
        width={screenWidth}
        style={{ minHeight: 265 }}
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
      <View className="w-[95vw] mx-auto flex-row justify-between">
        <TimerPicker />
        <FormField
          control={control}
          title="notes"
          isHeader={false}
          styles="w-[45vw] h-12"
          multiline
        />
      </View>
    </View>
  );
};
