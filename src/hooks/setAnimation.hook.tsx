import { useEffect, useState } from "react";
import {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { Exercise } from "../contexts/WorkoutForm.context";

export const useSetListAnimation = ({
  exercises,
  exerciseIndex,
}: {
  exercises: Exercise[];
  exerciseIndex: number;
}) => {
  const [flipped, setFlipped] = useState(false);
  const rotation = useSharedValue(0);

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = interpolate(rotation.value, [0, 1], [0, 360]);
    return {
      transform: [{ perspective: 600 }, { rotateY: `${rotateY}deg` }],
    };
  });

  const toggleFlip = () => {
    setFlipped((prev) => !prev);
    rotation.value = withTiming(flipped ? 0 : 1, { duration: 1000 });
  };

  useEffect(() => {
    if (exercises[exerciseIndex]?.sets || exerciseIndex) toggleFlip();
  }, [exerciseIndex]);

  return animatedStyle;
};
