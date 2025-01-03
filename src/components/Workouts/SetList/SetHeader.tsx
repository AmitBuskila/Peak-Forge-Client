import { FC, Fragment } from "react";
import { View, Text, StyleSheet } from "react-native";

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
      <View style={{ flex: 2.8 }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Rep Target</Text>
      </View>
      <View style={{ flex: 3 }} className="items-center">
        <Text className="text-l font-bold text-gray-100">Actual Reps</Text>
      </View>
    </View>
  );
};
