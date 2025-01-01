import React, { useState } from "react";
import { Dimensions, I18nManager, Image, StyleSheet, Text } from "react-native";
import DraggableFlatList from "react-native-draggable-flatlist";
import {
  GestureHandlerRootView,
  Pressable,
} from "react-native-gesture-handler";

const width = Dimensions.get("window").width;

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
      <Image
        className="h-full w-full rounded-lg"
        source={{
          uri: "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
        }}
      />
    </Pressable>
  );

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        className="mt-3"
        data={data}
        onEndReachedThreshold={0.001}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        horizontal
        snapToInterval={width * 0.82}
        decelerationRate={"fast"}
        showsHorizontalScrollIndicator={false}
        // ListFooterComponent={() => {
        //   return (
        //     <Pressable className="bg-white rounded-lg">
        //       <Text className="text-base text-gray-700">{"new"}</Text>
        //     </Pressable>
        //   );
        // }}
      />
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  item: {
    width: width * 0.7,
    marginLeft: width * 0.12,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#purple",
  },
});
