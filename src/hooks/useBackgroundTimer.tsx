import { useCountdown } from "react-native-countdown-circle-timer";

const threeHoursInSec: number = 18000;
export const useBackgroundTimer = () => {
  const { remainingTime } = useCountdown({
    isPlaying: true,
    duration: threeHoursInSec, //max five hours
    colors: "#abc",
  });

  return Math.abs(remainingTime - threeHoursInSec);
};
