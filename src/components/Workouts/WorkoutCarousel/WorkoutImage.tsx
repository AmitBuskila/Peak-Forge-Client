import { FC, useState } from "react";
import { Image, StyleSheet } from "react-native";
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
    marginLeft: screenWidth * 0.11,
    height: 250,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
    borderWidth: 2,
  },
});
