import { FC } from "react";
import {
  GestureResponderEvent,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { Workout } from "../../../types/template";
import { useAppContext } from "../../contexts/AppContext.context";

export const WorkoutTemplate: FC<{ template: Workout }> = ({
  template,
}: {
  template: Workout;
}) => {
  const modalRef = useAppContext().activeWorkoutModalRef;

  const handleTemplatePress = (e: GestureResponderEvent) => {
    modalRef.current?.present();
    setTimeout(() => {
      modalRef.current?.snapToIndex(3);
    }, 100);
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
          uri: template.templateImage,
        }}
        resizeMode="cover"
      />
      <Text className="3s font-psemibold color-secondary-100 ">
        {template.name || "new template"}
      </Text>
    </TouchableOpacity>
  );
};
