import { Chip } from "react-native-elements";
import { FC } from "react";

export const ClickChip: FC<{
  title: string;
  color: string;
  onClick: () => void;
}> = ({ title, color, onClick }) => {
  return (
    <Chip
      key={title}
      title={title}
      containerStyle={{ marginHorizontal: 4, marginVertical: "auto" }}
      buttonStyle={{
        backgroundColor: color,
        borderRadius: 13,
        borderColor: "#5f2aa1",
        borderWidth: 1,
      }}
      onPress={onClick}
    />
  );
};
