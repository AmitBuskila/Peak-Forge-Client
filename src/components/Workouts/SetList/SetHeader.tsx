import { FC } from "react";
import { Text, View } from "react-native";

export const SetHeader: FC<{ isWorkout: boolean }> = ({ isWorkout }) => {
  return (
    <View className="flex-1 flex-row my-1">
      <View style={{ flex: 1.5 }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Set</Text>
      </View>
      <View style={{ flex: 2.5 }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Previous</Text>
      </View>
      <View style={{ flex: 2 }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Kg</Text>
      </View>
      <View style={{ flex: 3 }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Rep Range</Text>
      </View>
      <View style={{ flex: 2.5 }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Done</Text>
      </View>
    </View>
  );
};
