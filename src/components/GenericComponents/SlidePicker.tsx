import React, { useState } from "react";
import { View, Text } from "react-native";
import ScrollPicker from "react-native-wheel-scrollview-picker";

export const SliderPicker = () => {
  const initialValues = [{ id: "pizza", value: 3 }];
  const [pizzas, setPizzas] = useState(initialValues);
  const pizzaNumbers = [{ id: "pizza", label: "🍕", min: 0, max: 99 }];

  return (
    <View>
      <ScrollPicker
        dataSource={["1", "2", "3", "4", "5", "6"]}
        selectedIndex={1}
        renderItem={(data, index) => {
          return (
            <View className="px-3">
              <Text>{index}</Text>
            </View>
          );
        }}
        // onValueChange={(data, selectedIndex) => {
        //   //
        // }}
        wrapperHeight={50}
        wrapperBackground="#FFFFFF"
        itemHeight={20}
        highlightColor="#d8d8d8"
        highlightBorderWidth={2}
      />
    </View>
  );
};
