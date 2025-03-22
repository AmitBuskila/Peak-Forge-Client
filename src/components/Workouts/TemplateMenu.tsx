import React, { forwardRef } from "react";
import { Text } from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { useRemoveTemplateMutation } from "../../store/apis/serverApi";

const TemplateMenu = forwardRef<Menu>((_, ref) => {
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
        <MenuOption onSelect={() => alert(`Delete`)}>
          <Text className="text-red-500 font-bold">Delete</Text>
        </MenuOption>
      </MenuOptions>
    </Menu>
  );
});

export default TemplateMenu;
