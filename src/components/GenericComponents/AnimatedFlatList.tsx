import React from "react";
import { View, Text, ListRenderItemInfo } from "react-native";
import { FlatList, FlatListProps } from "react-native";
import * as Animatable from "react-native-animatable";

interface AnimatedFlatListProps<T>
  extends Omit<FlatListProps<T>, "renderItem" | "data"> {
  data: T[];
  renderItem: FlatListProps<T>["renderItem"];
}

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

Animatable.initializeRegistryWithDefinitions({
  zoomIn,
  zoomOut,
});

export const AnimatedFlatList = <T extends { id: number }>({
  data,
  renderItem,
}: AnimatedFlatListProps<T>) => {
  const wrappedRenderItem = ({
    item,
    index,
    separators,
  }: ListRenderItemInfo<T>) => (
    <Animatable.View
      className="mr-4"
      animation={activeItem.id === item.id ? "zoomIn" : "zoomOut"}
      duration={300}
    >
      {renderItem &&
        renderItem({
          item,
          index,
          separators,
        })}
    </Animatable.View>
  );

  const [activeItem, setActiveItem] = React.useState(data[0]);

  return (
    <FlatList
      data={data}
      renderItem={wrappedRenderItem}
      horizontal={true}
      keyExtractor={(item) => item.id.toString()}
      viewabilityConfig={{ itemVisiblePercentThreshold: 70 }}
      showsHorizontalScrollIndicator={false}
      contentOffset={{ x: 170, y: 0 }}
      onViewableItemsChanged={({ viewableItems }) => {
        if (viewableItems.length > 0) {
          setActiveItem(viewableItems[0].item);
        }
      }}
    />
  );
};

export default AnimatedFlatList;
