import { FC } from "react";
import { Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import Animated, { LinearTransition, SlideInUp } from "react-native-reanimated";
import { SetStats } from "../../../types/template";
import { defaultChartProps, getVolumeChartData } from "./utils";

export const VolumeChart: FC<{
  workSetsData: SetStats[];
  exerciseName: string;
}> = ({ workSetsData, exerciseName }) => {
  const { data, maxValue } = getVolumeChartData(workSetsData);

  return (
    <Animated.View
      entering={SlideInUp.duration(600)}
      layout={LinearTransition.springify()}
      className="p-4 bg-black-100 rounded-2xl shadow-lg mt-4"
    >
      <Text className="text-gray-100 font-pblack text-xl mb-2 text-center">
        {!!data?.length
          ? exerciseName
          : "Looks like you havent done this exercise yet, come back later!"}
      </Text>
      {!!data?.length && (
        <LineChart
          data={data}
          maxValue={maxValue}
          scrollToEnd={true}
          thickness={3}
          hideDataPoints={false}
          color="#5f2aa1"
          dataPointsColor="#7448ac"
          dataPointsRadius={4}
          areaChart
          startFillColor="#5f2aa1"
          endFillColor="#161622"
          startOpacity={0.18}
          endOpacity={0.01}
          yAxisLabelSuffix=""
          textShiftY={-7}
          textShiftX={-5}
          {...defaultChartProps}
        />
      )}
    </Animated.View>
  );
};
