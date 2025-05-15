import { Text, View } from "react-native";
import { NumericInput } from "../../GenericComponents/NumericInput";
import { FormWorkoutSet } from "../../../contexts/WorkoutForm.context";
import { getFlexResolver } from "./utils";

export const SetItem = ({
  item,
  setIndex,
  displayIndex,
  exerciseIndex,
  isWorkout,
}: {
  item: FormWorkoutSet;
  setIndex: number;
  displayIndex: number;
  exerciseIndex: number;
  isWorkout: boolean;
}) => {
  const flexResolver = getFlexResolver(isWorkout);

  return (
    <View className="flex-row items-center bg-gray-100 h-20 border-b border-secondary-200 rounded-lg">
      <View
        id="set"
        style={{ flex: flexResolver["key"] }}
        className="items-center"
      >
        <Text className="px-1 text-l font-bold">{displayIndex}</Text>
      </View>
      {isWorkout && (
        <View
          id="previous"
          style={{ flex: flexResolver["previous"] }}
          className="items-center"
        >
          <Text className="px-1 text-l font-bold">
            {item?.previous || "---"}
          </Text>
        </View>
      )}
      <View
        id="weight"
        style={{ flex: flexResolver["weight"] }}
        className="items-center"
      >
        <NumericInput
          fieldType="weight"
          setIndex={setIndex}
          exerciseIndex={exerciseIndex}
          float
        />
      </View>
      <View
        id="rep-range"
        style={{ flex: flexResolver["maxReps"] }}
        className="flex-row justify-center items-center"
      >
        <NumericInput
          fieldType="minReps"
          setIndex={setIndex}
          exerciseIndex={exerciseIndex}
        />
        <Text>-</Text>
        <NumericInput
          fieldType="maxReps"
          setIndex={setIndex}
          exerciseIndex={exerciseIndex}
        />
      </View>
      {isWorkout && (
        <View
          id="done"
          style={{ flex: flexResolver["done"] }}
          className="items-center"
        >
          <NumericInput
            fieldType="done"
            setIndex={setIndex}
            exerciseIndex={exerciseIndex}
            displayIndex={displayIndex - 1}
          />
        </View>
      )}
    </View>
  );
};
