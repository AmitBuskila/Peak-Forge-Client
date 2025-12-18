import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { useCountdown } from "react-native-countdown-circle-timer";

export const useBackgroundTimer = (duration: number) => {
  const [passedTime, setPassedTime] = useState<number>(0);

  const { remainingTime } = useCountdown({
    isPlaying: true,
    duration: duration,
    colors: "#abc",
  });

  useEffect(() => {
    (async () => {
      const workoutData = await AsyncStorage.getItem("workoutData");
      if (workoutData) {
        setPassedTime(JSON.parse(workoutData).totalTime || 0);
      }
    })();
  }, []);

  return Math.abs(remainingTime - duration) + passedTime;
};
