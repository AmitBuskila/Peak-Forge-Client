import moment, { Moment } from "moment";
import { FC, useEffect, useState } from "react";
import { Text, View } from "react-native";
import { RadarChart } from "react-native-gifted-charts";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useSelector } from "react-redux";
import { WeeklyVolumeStats } from "../../../types/template";
import { useGetWorkoutsStatsMutation } from "../../store/apis/serverApi";
import { UserSliceState } from "../../store/slices/UserSlice";
import { muscleToGeneral } from "./utils";
import { screenWidth } from "../../../constants";

export const WeeklyVolumeChart: FC = () => {
  const [getWorkoutsResults, { data }] = useGetWorkoutsStatsMutation();
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );
  const [fromDate, setFromDate] = useState<Moment>(moment().startOf("week"));
  const [toDate, setToDate] = useState<Moment>(moment().endOf("week"));
  const maxValue: number = 25;

  const isNextWeekDisabled: boolean = moment(toDate)
    .add(1, "week")
    .isAfter(moment().endOf("week"));

  useEffect(() => {
    if (user?.id) {
      getWorkoutsResults({
        userId: user.id,
        fromDate: fromDate.format("YYYY-MM-DD HH:mm"),
        toDate: toDate.format("YYYY-MM-DD HH:mm"),
      });
    }
  }, [user?.id, fromDate, toDate]);

  const chartData = data?.reduce(
    (acc: Record<string, number>, curr: WeeklyVolumeStats) => {
      curr.muscleGroups.forEach((muscle: string) => {
        if (!acc[muscleToGeneral[muscle]]) {
          acc[muscleToGeneral[muscle]] = 0;
        }
        acc[muscleToGeneral[muscle]]++;
      });
      return acc;
    },
    {}
  );

  const formattedChartData = {
    Chest: Math.min(chartData?.Chest || 0, maxValue),
    Shoulders: Math.min(chartData?.Shoulders || 0, maxValue),
    Triceps: Math.min(chartData?.Triceps || 0, maxValue),
    Back: Math.min(chartData?.Back || 0, maxValue),
    Biceps: Math.min(chartData?.Biceps || 0, maxValue),
    Legs: Math.min(chartData?.Legs || 0, maxValue),
    Glutes: Math.min(chartData?.Glutes || 0, maxValue),
    Core: Math.min(chartData?.Core || 0, maxValue),
  };

  return (
    <View className="w-[100vw] h-1/2 mt-8">
      <Text className="text-3xl font-pblack color-white text-center">
        Weekly Volume
      </Text>
      <View className="flex-row justify-around items-center mt-2">
        <IonIcons
          name={"arrow-back"}
          size={30}
          color={"white"}
          onPress={() => {
            setFromDate(moment(fromDate).subtract(1, "week"));
            setToDate(moment(toDate).subtract(1, "week"));
          }}
        />
        <Text className="text-lg font-pblack color-white text-center">
          {fromDate.format("MMMM Do")} - {toDate.format("MMMM Do")}
        </Text>
        <IonIcons
          name={"arrow-forward"}
          size={30}
          color={isNextWeekDisabled ? "gray" : "white"}
          disabled={isNextWeekDisabled}
          onPress={() => {
            setFromDate(moment(fromDate).add(1, "week"));
            setToDate(moment(toDate).add(1, "week"));
          }}
        />
      </View>

      <View className="overflow-visible items-center p-4">
        <RadarChart
          data={Object.values(formattedChartData)}
          labels={Object.keys(formattedChartData)}
          labelConfig={{
            stroke: "#5f2aa1",
            fontWeight: "bold",
            fontSize: 14,
            fontFamily: "Poppins-SemiBold",
            textAnchor: "middle",
          }}
          labelsPositionOffset={2}
          chartSize={screenWidth * 0.75}
          maxValue={maxValue}
          isAnimated
          polygonConfig={{
            showGradient: true,
            gradientColor: "#48138b",
            gradientOpacity: 0.7,
            stroke: "#5f2aa1",
            strokeWidth: 2.5,
          }}
          gridConfig={{
            strokeWidth: 0.5,
            stroke: "#5f2aa1",
          }}
        />
      </View>
    </View>
  );
};
