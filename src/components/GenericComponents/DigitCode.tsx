import React, { FC, useRef, useState } from "react";
import { Text, TextInput, TouchableWithoutFeedback, View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSequence,
  withTiming,
} from "react-native-reanimated";

const AnimatedBox = Animated.createAnimatedComponent(View);

export const DigitCode: FC<{
  onSubmit: (text: string) => void;
  length: number;
}> = ({ onSubmit, length }) => {
  const [code, setCode] = useState<string>("");
  const [hasError, setHasError] = useState<boolean>(false);
  const inputRef = useRef<TextInput | null>(null);
  const shake = useSharedValue(0);

  const handlePress = () => {
    inputRef.current?.focus();
  };

  const handleChangeText = (text: string) => {
    if (text.length <= length && /^\d*$/.test(text)) {
      setCode(text);
      if (text.length === length) {
        const isCorrect: boolean = text === "123456"; // For testing
        if (!isCorrect) {
          setHasError(true);
          shake.value = withSequence(
            withTiming(-10, { duration: 50 }),
            withTiming(10, { duration: 50 }),
            withTiming(-10, { duration: 50 }),
            withTiming(10, { duration: 50 }),
            withTiming(0, { duration: 50 })
          );
          setTimeout(() => {
            setHasError(false);
            setCode("");
          }, 500);
        } else {
          onSubmit(text);
        }
      }
    }
  };

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: shake.value }],
  }));

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <AnimatedBox
        style={animatedStyle}
        className="flex-row justify-center space-x-2"
      >
        {Array.from({ length }).map((_, index) => {
          const isFocused = code.length === index;
          const isFilled = index < code.length;
          const borderColor = hasError
            ? "border-red-500"
            : isFocused
              ? "border-blue-500"
              : "border-gray-300";

          return (
            <View
              key={index}
              className={`w-12 h-14 border-2 rounded-md items-center justify-center ${borderColor} bg-white mx-1`}
            >
              <Text className="text-xl">{isFilled ? code[index] : ""}</Text>
            </View>
          );
        })}

        <TextInput
          ref={inputRef}
          value={code}
          onChangeText={handleChangeText}
          keyboardType="number-pad"
          maxLength={length}
          className="absolute opacity-0"
          autoFocus
        />
      </AnimatedBox>
    </TouchableWithoutFeedback>
  );
};
