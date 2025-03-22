import { FC, useRef } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { Pressable, TouchableOpacity } from "react-native-gesture-handler";
import { Menu } from "react-native-popup-menu";
import IonIcons from "react-native-vector-icons/Ionicons";
import { screenWidth } from "../../../../constants";
import { FormExercise } from "../../../contexts/WorkoutForm.context";
import { ExerciseMenu } from "../ExerciseMenu";

export const WorkoutImage: FC<{ item: FormExercise; index: number }> = ({
  item,
  index,
}) => {
  const menuRef = useRef<Menu>(null);

  return (
    <Pressable style={styles.item}>
      <View className="absolute top-0.5 left-1/2 -translate-x-1/2 py-1 rounded-lg z-10 rounded-lg">
        <Text className="text-black font-bold text-lg bg-[rgba(245,245,245,0.8)]">
          {item.label}
        </Text>
      </View>

      <View className="absolute top-2 right-2 z-20">
        <TouchableOpacity onPress={() => menuRef.current?.open()}>
          <IonIcons name={"ellipsis-vertical"} size={30} color={"black"} />
        </TouchableOpacity>
        <ExerciseMenu ref={menuRef} />
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
