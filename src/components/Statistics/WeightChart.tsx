import { Text } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import Animated, { LinearTransition, SlideInUp } from "react-native-reanimated";
import { SetStats } from "../../../types/template";
import { getWeightChartData } from "./utils";

export const WeightChart = ({
  workSetsData,
  exerciseName,
}: {
  workSetsData: SetStats[];
  exerciseName: string;
}) => {
  const { data, maxValue } = getWeightChartData(workSetsData);

  return (
    <Animated.View
      entering={SlideInUp.duration(600)}
      layout={LinearTransition.springify()}
      className="p-4 bg-black-100 rounded-2xl shadow-lg mt-4"
    >
      <Text className="text-gray-100 font-pblack text-xl mb-2 text-center">
        {!!data?.length
          ? exerciseName
          : "Looks like you havent done this exercie yet, come back later!"}
      </Text>
      {!!data?.length && (
        <LineChart // todo add KG TO y axis
          data={data}
          noOfSections={4}
          maxValue={maxValue + (maxValue > 100 ? 40 : 10)}
          spacing={50}
          thickness={3}
          hideDataPoints={false}
          color="#5f2aa1"
          dataPointsColor="#7448ac"
          dataPointsRadius={5}
          areaChart
          startFillColor="#5f2aa1"
          endFillColor="#161622"
          startOpacity={0.18}
          endOpacity={0.01}
          yAxisColor="#232533"
          xAxisColor="#232533"
          yAxisTextStyle={{
            color: "#C2C2C2",
            fontFamily: "Poppins-Regular",
            fontSize: 12,
          }}
          xAxisLabelTextStyle={{
            color: "#C2C2C2",
            fontFamily: "Poppins-Regular",
            fontSize: 11,
          }}
          rulesColor="#232533"
          rulesType="solid"
          rulesThickness={1}
          textShiftY={-7}
          textShiftX={-5}
        />
      )}
    </Animated.View>
  );
};
