import { Text, View } from "react-native";
import { Set } from "../../../../types/template";
import { NumericInput } from "../../NumericInput";
import { FormValues } from "../../TemplateModal";
import { Control } from "react-hook-form";

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
        <NumericInput name="fuck" />
      </View>
      <View id="rep-target" style={{ flex: 2.8 }} className="items-center">
        <NumericInput name="fuck1" />
      </View>
      <View id="actual-reps" style={{ flex: 3 }} className="items-center">
        <NumericInput name="fuck2" />
      </View>
    </View>
  );
};
