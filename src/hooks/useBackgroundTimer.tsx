import { useCountdown } from "react-native-countdown-circle-timer";

const threeHoursInSec: number = 10800;
export const useBackgroundTimer = () => {
  const { remainingTime } = useCountdown({
    isPlaying: true,
    duration: threeHoursInSec, //max three hours
    colors: "#abc",
  });
  return Math.abs(remainingTime - threeHoursInSec);
};
