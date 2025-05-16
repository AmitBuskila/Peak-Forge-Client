import moment from "moment";
import { FC, useEffect } from "react";
import { Text } from "react-native";
import { BarChart } from "react-native-gifted-charts";
import Animated, { LinearTransition, SlideInUp } from "react-native-reanimated";
import { useSelector } from "react-redux";
import { Exercise } from "../../entities/exercise.entity";
import { useLazyGetExerciseStatsQuery } from "../../store/apis/serverApi";
import { UserSliceState } from "../../store/slices/UserSlice";

export const Chart: FC<{ exercise: Exercise | null }> = ({ exercise }) => {
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );
  const [getExerciseStats, { data: workSetsData }] =
    useLazyGetExerciseStatsQuery();
  let maxValue: number = 0;

  useEffect(() => {
    if (exercise)
      getExerciseStats({ userId: user!.id, exerciseId: exercise.id });
  }, [exercise]);

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
            ? exercise?.name
            : "Looks like you havent done this exercie yet, come back later!"}
        </Text>
        {barData.length && (
          <BarChart
            isThreeD
            isAnimated
            data={barData}
            noOfSections={3}
            maxValue={maxValue + 10}
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
