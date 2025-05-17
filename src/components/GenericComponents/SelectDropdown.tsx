import { Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";

export const CustomSelectDropdown = <T extends { name: string }>({
  options,
  onSelect,
  selectedItem,
  placeholder = "Select...",
  getLabel = (item: T) => item.name,
}: {
  options: T[];
  onSelect: (item: T) => void;
  selectedItem?: T | null;
  placeholder?: string;
  getLabel?: (item: T) => string;
}) => {
  return (
    <SelectDropdown
      data={options}
      onSelect={onSelect}
      renderButton={(item, isOpened) => (
        <View className="h-12 bg-secondary-200 rounded-xl flex-row items-center px-3">
          <Text className="flex-1 text-base text-black-200 font-pmedium">
            {item ? getLabel(item) : placeholder}
          </Text>
          <Text className="text-lg text-black-200">{isOpened ? "▲" : "▼"}</Text>
        </View>
      )}
      renderItem={(item) => (
        <View className="w-full px-3 py-2 bg-primary">
          <Text className="text-base text-white font-pregular">
            {getLabel(item)}
          </Text>
        </View>
      )}
      defaultValue={selectedItem || placeholder}
    />
  );
};
