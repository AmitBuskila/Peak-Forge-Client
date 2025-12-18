import { FC } from "react";
import { useWatch } from "react-hook-form";
import { Button, Image, Modal, Text, View } from "react-native";
import DraggableFlatList, {
  RenderItemParams,
} from "react-native-draggable-flatlist";
import IonIcons from "react-native-vector-icons/Ionicons";
import {
  FormExercise,
  useWorkoutFormContext,
} from "../../../contexts/WorkoutForm.context";

export const ReorderExercisesModal: FC<{
  isVisible: boolean;
  onClose: () => void;
}> = ({ isVisible, onClose }) => {
  const { control, setValue } = useWorkoutFormContext().form;
  const exercises = useWatch({ control, name: "exercises" });

  const renderItem = ({
    item,
    drag,
    isActive,
  }: RenderItemParams<FormExercise>) => {
    return (
      <View
        className={` my-0.5 rounded-lg border-2 border-secondary-200
          ${isActive ? "bg-gray-300" : "bg-white"} flex-row justify-between items-center`}
      >
        <Image
          className="rounded-full w-20 h-20"
          source={{ uri: item.imageUri }}
        />
        <Text
          className="ml-2 font-bold text-sm w-40 flex-wrap"
          numberOfLines={2}
          ellipsizeMode="tail"
        >
          {item.label}
        </Text>
        <IonIcons
          name={"reorder-three"}
          size={50}
          color={"#48138b"}
          onLongPress={drag}
        />
      </View>
    );
  };

  //Todo fix flicker on drag end
  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View className="flex-1 justify-center items-center bg-[rgba(0,0,0,0.5)]">
        <View className="bg-black-100 rounded-lg w-[70vw] h-[50vh] p-4 flex">
          <View className="flex-1">
            <DraggableFlatList
              data={exercises}
              keyExtractor={(item) => item.key.toString()}
              renderItem={renderItem}
              onDragEnd={({ data }) => {
                setValue("exercises", data);
              }}
            />
          </View>
          <View className="mt-3">
            <Button title="Confirm" onPress={onClose} />
          </View>
        </View>
      </View>
    </Modal>
  );
};
