import { FC, useState } from "react";
import { Image, StyleSheet } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { screenWidth } from "../../../../constants";

export const WorkoutImage: FC<{
  item: { key: string; label: string };
  drag: () => void;
  isActive: boolean;
}> = ({ item, drag, isActive }) => {
  const [isPressing, setIsPressing] = useState<boolean>(false);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        {
          backgroundColor: isActive ? "lightblue" : "white",
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onLongPress={() => {
        drag();
        setIsPressing(true);
      }}
      onPressOut={() => setIsPressing(false)}
    >
      <Image
        className="h-full w-full rounded-lg"
        source={{
          uri: "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: screenWidth * 0.7,
    marginLeft: screenWidth * 0.12,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
    borderColor: "#purple",
  },
});
