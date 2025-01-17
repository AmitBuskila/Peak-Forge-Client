import { Text, View } from "react-native";
import { NumericInput } from "../../NumericInput";
import { Set } from "../../../contexts/WorkoutForm.context";

//   todo use wheel picker
export const SetItem = ({
  item,
  setIndex,
  exerciseIndex,
}: {
  item: Set;
  setIndex: number;
  exerciseIndex: number;
}) => {
  const itemIndex: number = setIndex + 1;

  return (
    <View className="flex-row items-center bg-gray-100 h-16 border-b border-secondary-200">
      <View id="set" style={{ flex: 1.5 }} className="items-center">
        <Text className="px-1 text-l font-bold">{itemIndex}</Text>
      </View>
      <View id="previous" style={{ flex: 2.5 }} className="items-center">
        <Text className="px-1 text-l font-bold">{item?.previous || "---"}</Text>
      </View>
      <View id="weight" style={{ flex: 2 }} className="items-center">
        <NumericInput
          fieldType="weight"
          setIndex={setIndex}
          exerciseIndex={exerciseIndex}
        />
      </View>
      <View
        id="rep-range"
        style={{ flex: 3 }}
        className="items-center flex-row"
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
      <View id="done" style={{ flex: 2.5 }} className="items-center">
        <NumericInput
          fieldType="done"
          setIndex={setIndex}
          exerciseIndex={exerciseIndex}
        />
      </View>
    </View>
  );
};
