import React, { useState } from "react";
import DraggableFlatList from "react-native-draggable-flatlist";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { screenWidth } from "../../../../constants";
import { WorkoutImage } from "./WorkoutImage";

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

  return (
    <GestureHandlerRootView>
      <DraggableFlatList
        className="mt-3"
        data={data}
        onEndReachedThreshold={0.001}
        onDragEnd={({ data }) => setData(data)}
        keyExtractor={(item) => item.key}
        renderItem={WorkoutImage}
        horizontal
        snapToInterval={screenWidth * 0.82}
        decelerationRate={"fast"}
        animationConfig={{ duration: 500 }} //todo improve animation
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
