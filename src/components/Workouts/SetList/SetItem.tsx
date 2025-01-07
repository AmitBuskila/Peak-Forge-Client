import { Text, View } from "react-native";
import { Set } from "../../../../types/template";
import { NumericInput } from "../../NumericInput";

//   todo use wheel picker
export const SetItem = ({ item, index }: { item: Set; index: number }) => {
  const itemIndex: number = index + 1;

  return (
    <View className="flex-row items-center bg-gray-100 h-16 border-b border-secondary-200">
      <View id="set" style={{ flex: 1.5 }} className="items-center">
        <Text className="px-1 text-l font-bold">{itemIndex}</Text>
      </View>
      <View id="previous" style={{ flex: 2.5 }} className="items-center">
        <Text className="px-1 text-l font-bold">{item.previous || "---"}</Text>
      </View>
      <View id="weight" style={{ flex: 2 }} className="items-center">
        <NumericInput
          fieldType="weight"
          setIndex={index}
          exerciseIndex={index}
        />
      </View>
      <View
        id="rep-range"
        style={{ flex: 3 }}
        className="items-center flex-row"
      >
        <NumericInput
          fieldType="repRange.minReps"
          setIndex={index}
          exerciseIndex={index}
        />
        <Text>-</Text>
        <NumericInput
          fieldType="repRange.maxReps"
          setIndex={index}
          exerciseIndex={index}
        />
      </View>
      <View id="done" style={{ flex: 2.5 }} className="items-center">
        <NumericInput fieldType="done" setIndex={index} exerciseIndex={index} />
      </View>
    </View>
  );
};
