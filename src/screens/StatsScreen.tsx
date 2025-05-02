import { FC } from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

export const Stats: FC = () => {
  const data = [{ value: 15 }, { value: 30 }, { value: 26 }, { value: 40 }];

  return (
    <View className="bg-primary h-full">
      <LineChart
        areaChart
        data={data}
        startFillColor="rgb(46, 217, 255)"
        startOpacity={0.8}
        endFillColor="rgb(203, 241, 250)"
        endOpacity={0.3}
        isAnimated={true}
        adjustToWidth
      />
      <Text className="text-white text-center font-bold my-auto text-xl">
        Coming soon!
      </Text>
    </View>
  );
};
