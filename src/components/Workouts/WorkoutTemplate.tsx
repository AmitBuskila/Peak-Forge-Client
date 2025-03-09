import { FC } from "react";
import {
  GestureResponderEvent,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAppContext } from "../../contexts/AppContext.context";
import { Template } from "../../entities/template.entity";

export const WorkoutTemplate: FC<{ workout: Template }> = ({ workout }) => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [_, setActiveWorkout] = useAppContext().activeWorkout;

  const handleTemplatePress = (e: GestureResponderEvent) => {
    setActiveWorkout(workout);
    modalRef.current?.present();
  };

  return (
    <TouchableOpacity
      className="relative justify-center items-center"
      activeOpacity={0.7}
      onPress={handleTemplatePress}
    >
      <ImageBackground
        style={{ width: 150, height: 200 }}
        className="bg-white width-50 h-50 rounded-[35px] my-5 overflow-hidden shadow-lg shadow-black/40 "
        source={{
          uri: workout.image,
        }}
        resizeMode="cover"
      />
      <Text className="3s font-psemibold color-secondary-100 ">
        {workout.name || "new template"}
      </Text>
    </TouchableOpacity>
  );
};
