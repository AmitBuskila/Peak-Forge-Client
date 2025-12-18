import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { forwardRef } from "react";
import { Alert, Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useAppContext } from "../../contexts/AppContext.context";
import { Template } from "../../entities/template.entity";
import { useRemoveTemplateMutation } from "../../store/apis/serverApi";

interface TemplateMenuProps {
  template: Template;
}

const TemplateMenu = forwardRef<Menu, TemplateMenuProps>(
  ({ template }, ref) => {
    const [removeTemplate] = useRemoveTemplateMutation();
    const navigation = useNavigation<NavigationProp<string>>();
    const [activeWorkout, setActiveWorkout] = useAppContext().activeWorkout;

    return (
      <Menu ref={ref} style={{ width: 10 }}>
        <MenuTrigger />
        <MenuOptions
          customStyles={{
            optionsContainer: {
              borderRadius: 10,
              backgroundColor: "whitesmoke",
              width: 85,
            },
          }}
        >
          <MenuOption
            onSelect={() => {
              navigation.navigate("Create Template");
              setActiveWorkout(template);
            }}
          >
            <Text className="font-bold">Edit</Text>
          </MenuOption>
          <MenuOption
            onSelect={() =>
              Alert.alert(
                "Delete template?",
                "all workouts using this template will be deleted",
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    style: "destructive",
                    onPress: () => removeTemplate({ templateId: template.id }),
                  },
                ]
              )
            }
          >
            <Text className="text-red-500 font-bold">Delete</Text>
          </MenuOption>
        </MenuOptions>
      </Menu>
    );
  }
);

export default TemplateMenu;
