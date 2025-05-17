import moment from "moment";
import { FC } from "react";
import { Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Animated, { LinearTransition, SlideInUp } from "react-native-reanimated";
import { SetStats } from "../../../types/template";

export const RepsAndWeightChart: FC<{
  workSetsData?: SetStats[];
  exerciseName?: string;
}> = ({ workSetsData, exerciseName }) => {
  let maxValue: number = 0;

  const barData = workSetsData
    ?.filter((set) => !set.isSecondary && !!set.weight && !!set.repsDone)
    .map((set) => {
      if (+set.repsDone! > maxValue) maxValue = +set.repsDone!;
      return {
        value: +set.repsDone!,
        weight: +set.weight,
        label: moment(set.date).format("DD/MM"),
        topLabelComponent: () => (
          <Text className="text-secondary-200 text-xs font-psemibold">
            {set.repsDone}
          </Text>
        ),
      };
    });

  const lineData = barData?.map((item) => {
    if (item.weight! > maxValue) maxValue = item.weight;
    return {
      value: item.weight,
      dataPointText: item.weight.toString() + " kg",
    };
  });

  return (
    !!barData && (
      <Animated.View
        entering={SlideInUp.duration(600)}
        layout={LinearTransition.springify()}
        className="p-4 bg-black-100 rounded-2xl shadow-lg"
      >
        <Text className="text-gray-100 font-pblack text-xl mb-2 text-center">
          {barData.length
            ? exerciseName
            : "Looks like you havent done this exercie yet, come back later!"}
        </Text>
        {!!barData.length && (
          <BarChart
            data={barData}
            noOfSections={3}
            maxValue={maxValue + (maxValue > 100 ? 40 : 10)}
            barWidth={16}
            spacing={36}
            initialSpacing={12}
            frontColor="#7448ac"
            sideColor="#5f2aa1"
            topColor="#48138b"
            yAxisColor="#232533"
            xAxisColor="#232533"
            barBorderColor="#7448ac"
            barBorderWidth={0}
            yAxisTextStyle={{
              color: "#C2C2C2",
              fontFamily: "Poppins-Regular",
              fontSize: 11,
            }}
            xAxisLabelTextStyle={{
              color: "#C2C2C2",
              fontFamily: "Poppins-Regular",
              fontSize: 10,
            }}
            showLine
            lineData={lineData}
            lineConfig={{
              curved: true,
              thickness: 2,
              color: "#48138b",
              dataPointsColor: "#161622",
              textColor: "#C2C2C2",
              textFontSize: 10,
              textShiftY: -8,
              textShiftX: -12,
            }}
          />
        )}
      </Animated.View>
    )
  );
};
