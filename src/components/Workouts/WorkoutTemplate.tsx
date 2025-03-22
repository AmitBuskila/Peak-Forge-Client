import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, useRef } from "react";
import {
  Alert,
  GestureResponderEvent,
  ImageBackground,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Menu } from "react-native-popup-menu";
import IonIcons from "react-native-vector-icons/Ionicons";
import { useAppContext } from "../../contexts/AppContext.context";
import { Template } from "../../entities/template.entity";
import TemplateMenu from "./TemplateMenu";

export const WorkoutTemplate: FC<{ template: Template }> = ({ template }) => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [activeWorkout, setActiveWorkout] = useAppContext().activeWorkout;
  const menuRef = useRef<Menu>(null);

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
            isPreferred: true,
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
      >
        <View style={{ position: "absolute", top: 10, right: 10 }}>
          <IonIcons
            name={"ellipsis-vertical"}
            size={30}
            color={"whitesmoke"}
            onPress={() => {
              if (menuRef.current) {
                menuRef.current.open();
              }
            }}
          />
          <TemplateMenu ref={menuRef} templateId={template.id} />
        </View>
      </ImageBackground>
      <Text className="3s font-psemibold color-secondary-100 ">
        {template.name || "new template"}
      </Text>
    </TouchableOpacity>
  );
};
