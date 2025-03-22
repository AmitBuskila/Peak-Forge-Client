import React, { FC, forwardRef } from "react";
import { Alert, Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useRemoveTemplateMutation } from "../../store/apis/serverApi";

interface TemplateMenuProps {
  templateId: number;
}

const TemplateMenu = forwardRef<Menu, TemplateMenuProps>(
  ({ templateId }, ref) => {
    const [removeTemplate] = useRemoveTemplateMutation();

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
          <MenuOption onSelect={() => alert(`Edit`)}>
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
                    onPress: () => removeTemplate({ templateId }),
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
