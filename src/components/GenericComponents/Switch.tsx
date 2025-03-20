import { Dispatch, FC, SetStateAction } from "react";
import { Pressable, View } from "react-native";
import Animated, {
  interpolate,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";
import { FormWorkoutSet } from "../../contexts/WorkoutForm.context";

interface SwitchProps {
  value: number;
  onPress: () => void;
  duration?: number;
  trackColors?: {
    on: string;
    off: string;
  };
}

export const Switch: FC<SwitchProps> = ({
  value,
  onPress,
  duration = 400,
  trackColors = { on: "#82cab2", off: "#fa7f7c" },
}) => {
  const height = useSharedValue(0);
  const width = useSharedValue(0);

  const trackAnimatedStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      value,
      [0, 1],
      [trackColors.off, trackColors.on]
    );
    return {
      backgroundColor: withTiming(color, { duration }),
      borderRadius: height.value / 2,
    };
  });

  const thumbAnimatedStyle = useAnimatedStyle(() => {
    const moveValue = interpolate(
      value,
      [0, 1],
      [0, width.value - height.value]
    );
    return {
      transform: [{ translateX: withTiming(moveValue, { duration }) }],
      borderRadius: height.value / 2,
    };
  });

  return (
    <Pressable onPress={onPress} className="p-1">
      <Animated.View
        onLayout={(e) => {
          height.value = e.nativeEvent.layout.height;
          width.value = e.nativeEvent.layout.width;
        }}
        className={"flex w-[20vw] h-11 p-1"}
        style={trackAnimatedStyle}
      >
        <Animated.View
          className="h-full aspect-square bg-white flex items-center justify-center"
          style={thumbAnimatedStyle}
        >
          <Animated.Text className="text-lg font-bold">
            {value ? "A" : "B"}
          </Animated.Text>
        </Animated.View>
      </Animated.View>
    </Pressable>
  );
};

export const ToggleSwitch: FC<{
  isOn: number;
  setIsOn: Dispatch<SetStateAction<number>>;
  sets: FormWorkoutSet[];
}> = ({ isOn, setIsOn, sets }) => {
  const rotate = useSharedValue(0);

  const handlePress = () => {
    if (!isOn && sets.some((set) => set.isSecondary)) {
      rotate.value = withSequence(
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 }),
        withTiming(-10, { duration: 50 }),
        withTiming(0, { duration: 50 }),
        withTiming(10, { duration: 50 }),
        withTiming(0, { duration: 50 })
      );
    } else {
      setIsOn((prev) => (prev + 1) % 2);
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ rotateZ: `${rotate.value}deg` }],
  }));

  return (
    <View>
      <Animated.View style={animatedStyle}>
        <Switch value={isOn} onPress={handlePress} />
      </Animated.View>
    </View>
  );
};
