import moment from "moment";
import { FC } from "react";
import { Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Animated, { LinearTransition, SlideInUp } from "react-native-reanimated";
import { SetStats } from "../../../types/template";
import { getRepsAndWeightChartData, defaultChartProps } from "./utils";

export const RepsAndWeightChart: FC<{
  workSetsData?: SetStats[];
  exerciseName?: string;
}> = ({ workSetsData, exerciseName }) => {
  const { barData, maxValue, lineData } =
    getRepsAndWeightChartData(workSetsData);

  return (
    <Animated.View
      entering={SlideInUp.duration(600)}
      layout={LinearTransition.springify()}
      className="p-4 bg-black-100 rounded-2xl shadow-lg mt-4"
    >
      <Text className="text-gray-100 font-pblack text-xl mb-2 text-center">
        {!!barData?.length
          ? exerciseName
          : "Looks like you havent done this exercise yet, come back later!"}
      </Text>
      {!!barData?.length && (
        <BarChart
          data={barData}
          maxValue={maxValue}
          barWidth={16}
          initialSpacing={12}
          frontColor="#7448ac"
          showLine
          lineData={lineData}
          lineConfig={{
            curved: true,
            thickness: 2,
            color: "#5f2aa1",
            dataPointsColor: "#7448ac",
            dataPointsRadius: 4,
            textColor: "#C2C2C2",
            textFontSize: 10,
            textShiftY: -8,
            textShiftX: -12,
          }}
          {...defaultChartProps}
        />
      )}
    </Animated.View>
  );
};
