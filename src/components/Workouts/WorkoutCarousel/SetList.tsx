import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

export const SetList = () => {
  const [data, setData] = useState(
    Array.from({ length: 5 }, (_, index) => ({
      key: `${index}`,
      text: `Set ${index + 1}`,
    }))
  );

  const deleteRow = (rowKey) => {
    const newData = data.filter((item) => item.key !== rowKey);
    setData(newData);
  };

  const renderItem = ({ item }) => (
    <View className="flex flex-row justify-center items-center bg-gray-100 h-16 border-b border-secondary-200">
      <Text className="font-xl">{item.text}</Text>
    </View>
  );

  const renderHiddenItem = (data) => (
    <View className="flex flex-row justify-end items-center bg-red-500 h-full">
      <TouchableOpacity
        className="flex justify-center items-center h-full w-[15%]"
        onPress={() => deleteRow(data.item.key)}
      >
        <Icon name="trash-can-outline" size={30} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View className="my-3">
      <SwipeListView
        data={data}
        renderItem={renderItem}
        disableRightSwipe
        renderHiddenItem={renderHiddenItem}
        rightOpenValue={-60}
      />
    </View>
  );
};
