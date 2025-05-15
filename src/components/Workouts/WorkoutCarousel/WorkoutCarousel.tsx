import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import React, { FC } from "react";
import { useFieldArray } from "react-hook-form";
import { View } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { screenWidth } from "../../../../constants";
import { Workout } from "../../../../types/template";
import { useAppContext } from "../../../contexts/AppContext.context";
import {
  FormExercise,
  FormWorkoutSet,
  useWorkoutFormContext,
} from "../../../contexts/WorkoutForm.context";
import { Exercise } from "../../../entities/exercise.entity";
import { EmptyElement } from "../../GenericComponents/EmptyElement";
import { WorkoutImage } from "./WorkoutImage";

export const WorkoutCarousel: FC<{ workout?: Workout }> = ({ workout }) => {
  const { control } = useWorkoutFormContext().form;
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [_, setCurrExerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [isMainSetType, setIsMainSetType] = useWorkoutFormContext().isMainSet;
  const { append, fields } = useFieldArray({
    control,
    name: "exercises",
  });

  const data: FormExercise[] = [
    ...fields,
    { key: "0", imageUri: "", label: "", sets: [] },
  ];

  const handleEmptyElementPress = () => {
    navigation.navigate("Exercises", {
      onSelect: (exercise: Exercise) => {
        append({
          key: exercise.id.toString(),
          label: exercise.name,
          imageUri: exercise.image,
          sets: [{ key: "1" } as FormWorkoutSet],
        });
      },
    });
    modalRef.current?.snapToIndex(0);
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
        onSnapToItem={(index) => {
          setCurrExerciseIndex(index);
          setIsMainSetType(
            fields[index]?.sets?.some((set) => set.isSecondary && set.done)
              ? 0
              : 1
          );
        }}
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
    </View>
  );
};
