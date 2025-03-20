import { useCountdown } from "react-native-countdown-circle-timer";

const fiveHoursInSec: number = 18000;
export const useBackgroundTimer = () => {
  const { remainingTime } = useCountdown({
    isPlaying: true,
    duration: fiveHoursInSec, //max five hours
    colors: "#abc",
  });

  return Math.abs(remainingTime - fiveHoursInSec);
};
