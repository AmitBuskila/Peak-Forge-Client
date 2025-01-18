import React, { FC, useState } from "react";
import { DimensionValue, Pressable } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";
import { screenWidth } from "../../../constants";

export const EmptyElement: FC<{
  width: number;
  height: number;
  marginLeft: DimensionValue;
  handlePress: () => void;
}> = ({ width, height, handlePress, marginLeft }) => {
  const [isPressing, setIsPressing] = useState<boolean>(false);

  return (
    <Pressable
      className={`rounded-lg items-center justify-center 
                    border border-dashed border-secondary-200 
                    ${isPressing ? "bg-black-200 opacity-0.7" : "bg-black-100"}`}
      onPress={handlePress}
      style={{
        height,
        width: screenWidth * (width / 100),
        marginLeft: marginLeft,
        marginTop: 5,
      }}

      // onPressOut={() => setIsPressing(false)}
      // onPressIn={() => setIsPressing(true)}
      //todo handle press work well
    >
      <IonIcons name={"add"} size={height * 0.5} color={"#48138b"} />
    </Pressable>
  );
};
