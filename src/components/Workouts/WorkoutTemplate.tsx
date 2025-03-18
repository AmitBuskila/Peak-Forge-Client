import { FC } from "react";
import {
  Alert,
  GestureResponderEvent,
  ImageBackground,
  Text,
  TouchableOpacity,
} from "react-native";
import { useAppContext } from "../../contexts/AppContext.context";
import { Template } from "../../entities/template.entity";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const WorkoutTemplate: FC<{ template: Template }> = ({ template }) => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [activeWorkout, setActiveWorkout] = useAppContext().activeWorkout;

  const handleStartWorkout = () => {
    setActiveWorkout(template);
    AsyncStorage.setItem("activeWorkout", JSON.stringify(template));
    modalRef.current?.present();
  };

  const handleTemplatePress = (e: GestureResponderEvent) => {
    if (activeWorkout) {
      Alert.alert(
        "Start " + template.name,
        "Another workout in progress, continue anyway?",
        [
          {
            text: "Cancel",
            style: "cancel",
            onPress: () => console.log("Cancelled"),
          },
          {
            text: "Confirm",
            onPress: () => handleStartWorkout(),
          },
        ]
      );
    } else {
      handleStartWorkout();
    }
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
          uri: template.image,
        }}
        resizeMode="cover"
      />
      <Text className="3s font-psemibold color-secondary-100 ">
        {template.name || "new template"}
      </Text>
    </TouchableOpacity>
  );
};
