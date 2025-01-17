import { FC } from "react";
import { Text, View } from "react-native";
import { getFlexResolver } from "./utils";

export const SetHeader: FC<{ isWorkout: boolean }> = ({ isWorkout }) => {
  const flexResolver = getFlexResolver(isWorkout);

  return (
    <View className="flex-1 flex-row my-1">
      <View style={{ flex: flexResolver["key"] }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Set</Text>
      </View>
      {isWorkout && (
        <View
          style={{ flex: flexResolver["previous"] }}
          className="items-center"
        >
          <Text className="text-l font-bold text-gray-100">Previous</Text>
        </View>
      )}
      <View style={{ flex: flexResolver["weight"] }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Kg</Text>
      </View>
      <View style={{ flex: flexResolver["maxReps"] }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Rep Range</Text>
      </View>
      {isWorkout && (
        <View style={{ flex: flexResolver["done"] }} className="items-center">
          <Text className="text-l font-bold text-gray-100">Done</Text>
        </View>
      )}
    </View>
  );
};
