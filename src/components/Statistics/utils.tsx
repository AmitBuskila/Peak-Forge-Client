import { View, Text } from "react-native";
import { SetStats } from "../../../types/template";
import { Exercise } from "../../entities/exercise.entity";
import { Template } from "../../entities/template.entity";
import { RepsAndWeightChart } from "./RepsAndWeightChart";
import moment from "moment";

export const getChartResolver = (
  selectedExercise: Exercise | null,
  selectedTemplate: Template | null,
  data: SetStats[] | SetStats[][],
  isFetching: boolean
) => {
  if (!isFetching) {
    if (selectedExercise) {
      return (
        <RepsAndWeightChart
          workSetsData={data as SetStats[]}
          exerciseName={selectedExercise?.name}
        />
      );
    } else if (selectedTemplate) {
      return (data as SetStats[][])?.map((workSetsData, index) => (
        <RepsAndWeightChart
          key={index}
          workSetsData={workSetsData}
          exerciseName={workSetsData[0]?.exerciseName}
        />
      ));
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
