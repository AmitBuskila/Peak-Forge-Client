import React, { useState } from "react";
import { Dimensions, I18nManager, StyleSheet, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";

export const WorkoutCarousel = () => {
  const [data, setData] = useState([
    { key: "1", label: "Item 1" },
    { key: "2", label: "Item 2" },
    { key: "3", label: "Item 3" },
    { key: "4", label: "Item 4" },
    { key: "5", label: "Item 5" },
    { key: "6", label: "Item 6" },
    { key: "7", label: "Item 7" },
  ]);

  const renderItem = ({
    item,
    drag,
    isActive,
  }: {
    item: { key: string; label: string };
    drag: () => void;
    isActive: boolean;
  }) => (
    <Pressable
      style={[
        styles.item,
        { backgroundColor: isActive ? "lightblue" : "white" },
      ]}
      onLongPress={drag}
    >
      <Text className="text-base text-gray-700">{item.label}</Text>
    </Pressable>
  );

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        className="mt-3"
        data={data}
        onEndReached={() =>
          setData([...data, { key: (data.length++).toString(), label: "haha" }])
        }
        onEndReachedThreshold={0.001}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        ListFooterComponent={() => {
          return (
            <Pressable style={[styles.item, { backgroundColor: "white" }]}>
              <Text className="text-base text-gray-700">{"new"}</Text>
            </Pressable>
          );
        }}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: Dimensions.get("window").width * 0.25,
    marginHorizontal: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#ccc",
  },
});
