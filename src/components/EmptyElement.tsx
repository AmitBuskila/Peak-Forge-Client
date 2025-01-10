import React, { FC, useState } from "react";
import { Pressable } from "react-native";
import IonIcons from "react-native-vector-icons/Ionicons";

export const EmptyElement: FC<{
  width: string;
  height: string;
  handlePress: () => void;
}> = ({ width, height, handlePress }) => {
  const [isPressing, setIsPressing] = useState<boolean>(false);

  return (
    <Pressable
      className={`rounded-lg w-[${width}vw] h-[${height}px] mt-0.3 ml-[11vw] items-center justify-center 
                    border border-dashed border-secondary-200 
                    ${isPressing ? "bg-black-200 opacity-0.7" : "bg-black-100"}`}
      onPress={handlePress}

      // onPressOut={() => setIsPressing(false)}
      // onPressIn={() => setIsPressing(true)}
      //todo handle press work well
    >
      <IonIcons name={"add"} size={100} color={"#48138b"} />
    </Pressable>
  );
};
