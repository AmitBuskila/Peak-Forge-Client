import moment from "moment";
import { Dimensions, Text, View } from "react-native";
import { SetStats } from "../../../types/template";
import { Exercise } from "../../entities/exercise.entity";
import { Template } from "../../entities/template.entity";
import { RepsAndWeightChart } from "./RepsAndWeightChart";
import { VolumeChart } from "./VolumeChart";
import { WeightChart } from "./WeightChart";
import { JSX } from "react";
import { screenWidth } from "../../../constants";

export const defaultChartProps = {
  noOfSections: 3,
  spacing: 50,
  yAxisColor: "#232533",
  xAxisColor: "#232533",
  yAxisTextStyle: {
    color: "#C2C2C2",
    fontFamily: "Poppins-Regular",
    fontSize: 11,
  },
  xAxisLabelTextStyle: {
    color: "#C2C2C2",
    fontFamily: "Poppins-Regular",
    fontSize: 11,
  },
  rulesColor: "#232533",
  rulesType: "solid",
  rulesThickness: 1,
  endSpacing: screenWidth / Dimensions.get("window").scale,
};

const chartResolver: Record<
  string,
  (data: SetStats[], exerciseName: string, index?: number) => JSX.Element
> = {
  Weight: (data, exerciseName) => (
    <WeightChart exerciseName={exerciseName} workSetsData={data} />
  ),
  "Weight & Reps": (data, _, index) => (
    <RepsAndWeightChart
      key={index}
      workSetsData={data}
      exerciseName={data[0]?.exerciseName}
    />
  ),
  Volume: (data, exerciseName) => (
    <VolumeChart exerciseName={exerciseName} workSetsData={data} />
  ),
};

export const getChartsToDisplay = (
  selectedExercise: Exercise | null,
  selectedTemplate: Template | null,
  selectedChartType: { name: string },
  data: SetStats[] | SetStats[][],
  isFetching: boolean
) => {
  if (!isFetching) {
    if (selectedExercise) {
      return chartResolver[selectedChartType.name](
        data as SetStats[],
        selectedExercise.name
      );
    } else if (selectedTemplate) {
      return (data as SetStats[][])?.map((workSetsData, index) =>
        chartResolver[selectedChartType.name](
          workSetsData,
          workSetsData[0]?.exerciseName,
          index
        )
      );
    } else {
      return <View />;
    }
  }
};

export const getWeightChartData = (workSetsData: SetStats[]) => {
  let maxValue: number = 0;

  const filteredData = workSetsData?.filter((set) => {
    if (+set.weight > maxValue) maxValue = +set.weight;
    return !set.isSecondary && !!set.weight;
  });

  const relevantData = Object.values(
    filteredData.reduce((acc: Record<string, SetStats>, curr: SetStats) => {
      const day: string = new Date(curr.date).toISOString().split("T")[0];
      if (!acc[day] || acc[day].weight < curr.weight) {
        acc[day] = curr;
      }
      return acc;
    }, {})
  );

  const data = relevantData.map((set) => ({
    value: +set.weight,
    label: moment(set.date).format("DD/MM"),
    dataPointText: parseFloat(set.weight.toString()).toString() + " kg",
  }));

  return {
    data,
    maxValue: maxValue * 1.15,
  };
};

export const getRepsAndWeightChartData = (workSetsData?: SetStats[]) => {
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

  return {
    barData,
    lineData,
    maxValue: maxValue * 1.15,
  };
};

export const getVolumeChartData = (workSetsData: SetStats[]) => {
  let maxValue: number = 0;
  const filteredData = workSetsData?.filter(
    (set) => !set.isSecondary && !!set.weight && !!set.repsDone
  );

  const data = filteredData.reduce(
    (acc: Record<string, { value: number; label: string }>, curr: SetStats) => {
      const day: string = new Date(curr.date).toISOString().split("T")[0];
      const volume: number = +curr.weight * +curr.repsDone!;
      !acc[day]
        ? (acc[day] = {
            value: volume,
            label: moment(curr.date).format("DD/MM"),
          })
        : (acc[day] = {
            ...acc[day],
            value: acc[day].value + volume,
          });

      if (acc[day]?.value && acc[day].value > maxValue)
        maxValue = acc[day].value;

      return acc;
    },
    {}
  );

  return { data: Object.values(data), maxValue: maxValue * 1.15 };
};

export const muscleToGeneral: Record<string, string> = {
  Chest: "Chest",
  Shoulders: "Shoulders",
  Triceps: "Triceps",
  Biceps: "Biceps",
  Forearms: "Arms",
  Traps: "Back",
  Back: "Back",
  Core: "Core",
  "Hip Flexors": "Legs",
  Quadriceps: "Legs",
  Hamstrings: "Legs",
  Glutes: "Glutes",
  Calves: "Legs",
};
