import React, { FC, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animateable, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from "react-native-reanimated";

export const Countdown: FC = () => {
  const translateX = useSharedValue(100);
  const translateY = useSharedValue(100);

  const panGesture = Gesture.Pan().onChange((event) => {
    translateX.value += event.changeX;
    translateY.value += event.changeY;
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      {
        translateX: withSpring(translateX.value, {
          stiffness: 1000,
          damping: 30,
        }),
      },
      {
        translateY: withSpring(translateY.value, {
          stiffness: 1000,
          damping: 30,
        }),
      },
    ],
  }));

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = (time % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  return (
    <GestureDetector gesture={panGesture}>
      <Animateable.View
        className={"absolute z-50 bg-gray-200 rounded-full"}
        style={[
          {
            width: 140,
            height: 140,
          },
          animatedStyle,
        ]}
      >
        <CountdownCircleTimer
          size={140}
          isPlaying
          duration={7}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[7, 5, 2, 0]}
          trailColor="#d9d9d9"
          onComplete={() => ({ shouldRepeat: true, delay: 3 })}
          isSmoothColorTransition
        >
          {({ remainingTime, color }) => {
            return remainingTime ? (
              <View className="flex-column items-center justify-center">
                {remainingTime < 4 && (
                  <Text style={{ color }} className="font-bold text-xl">
                    Get Ready!
                  </Text>
                )}
                <Text style={[styles.timerText, { color }]}>
                  {formatTime(remainingTime)}
                </Text>
              </View>
            ) : (
              <Text
                style={{ color: "#004777" }}
                className="text-2xl text-center font-bold"
              >
                Get those {"\n"} gains!
              </Text>
            );
          }}
        </CountdownCircleTimer>
      </Animateable.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  timerText: {
    fontSize: 33,
    fontWeight: "bold",
    color: "#004777",
  },
});
