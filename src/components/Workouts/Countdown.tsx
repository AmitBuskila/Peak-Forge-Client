import React, { Dispatch, FC, SetStateAction } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { CountdownCircleTimer } from "react-native-countdown-circle-timer";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animateable, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { TimerProps } from "../../../types/template";
import { schedulePushNotification } from "../../utils/notifications";
import * as Notifications from "expo-notifications";

export const Countdown: FC<{
  duration: number;
  timerKey: number;
  setTimerKey: Dispatch<SetStateAction<TimerProps>>;
}> = ({ duration, timerKey, setTimerKey }) => {
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

  const handleChangeDuration = (delta: number) => {
    Notifications.getAllScheduledNotificationsAsync().then((res) => {
      const newScheduledTime = new Date().getTime() + (delta + duration) * 1000;
      setTimerKey({
        key: timerKey++,
        duration: duration + delta,
      });
      schedulePushNotification(
        newScheduledTime,
        res?.[0]?.content?.data?.exerciseName as string || 'Exercise' 
      );
    });
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
          key={timerKey}
          isPlaying
          duration={duration}
          colors={["#004777", "#F7B801", "#A30000", "#A30000"]}
          colorsTime={[15, 10, 5, 0]}
          trailColor="#d9d9d9"
          isSmoothColorTransition
        >
          {({ remainingTime, color }) => {
            return remainingTime ? (
              <View className="flex-column items-center justify-center">
                {remainingTime < 15 && (
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
        <View className="absolute bottom-[-10px] w-full flex-row justify-around mt-4 ">
          <TouchableOpacity
            onPress={() => handleChangeDuration(-10)}
            className="w-14 h-14 rounded-full border-[6px] border-[#A30000] bg-white justify-center items-center"
          >
            <Text className="text-l font-bold text-[#A30000] ">-10s</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => handleChangeDuration(10)}
            className="w-14 h-14 rounded-full border-[6px] border-[#004777] bg-white justify-center items-center"
          >
            <Text className="text-l font-bold text-[#004777]">+10s</Text>
          </TouchableOpacity>
        </View>
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
