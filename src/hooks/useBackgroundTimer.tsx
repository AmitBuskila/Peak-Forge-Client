import { useCountdown } from "react-native-countdown-circle-timer";

export const useBackgroundTimer = (duration: number) => {
  const { remainingTime } = useCountdown({
    isPlaying: true,
    duration: duration,
    colors: "#abc",
  });

  return Math.abs(remainingTime - duration);
};
