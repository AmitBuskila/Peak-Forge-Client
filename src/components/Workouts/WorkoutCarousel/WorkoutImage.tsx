import { FC, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Pressable } from "react-native-gesture-handler";
import { screenWidth } from "../../../../constants";
import { FormExercise } from "../../../contexts/WorkoutForm.context";

export const WorkoutImage: FC<{ item: FormExercise; index: number }> = ({
  item,
  index,
}) => {
  const [isPressing, setIsPressing] = useState<boolean>(false);

  return (
    <Pressable
      style={({ pressed }) => [
        styles.item,
        {
          opacity: pressed ? 0.7 : 1,
        },
      ]}
      onLongPress={() => {
        setIsPressing(true);
      }}
      onPressOut={() => setIsPressing(false)}
    >
      <View className="absolute top-0.5 left-1/2 -translate-x-1/2 px-2 py-1 rounded-lg z-10 rounded-lg">
        <Text className="text-black font-bold text-lg bg-[rgba(245,245,245,0.8)]">
          {item.label}
        </Text>
      </View>
      <Image
        className="h-full w-full rounded-lg"
        source={{
          uri: item.imageUri,
        }}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  item: {
    width: screenWidth * 0.7,
    marginHorizontal: "auto",
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
  },
});
