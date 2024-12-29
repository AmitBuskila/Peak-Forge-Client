import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as ImagePicker from "expo-image-picker";
import React, { FC, useState } from "react";
import { FieldValues, SetFieldValue } from "react-hook-form";
import { Alert, Image, TouchableOpacity, View } from "react-native";

export const CustomImagePicker: FC<{
  styles: string;
  setValue: SetFieldValue<FieldValues>;
  uri?: string;
}> = ({ styles, setValue, uri }) => {
  const [image, setImage] = useState<string | null>(null);
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera 
                 roll permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      if (!result.canceled) {
        const imageUri: string = result?.assets?.[0].uri;
        setImage(imageUri);
        setValue(imageUri);
      }
    }
  };
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={pickImage}
      className={`border-2 border-black-200 
        rounded-2xl bg-black-100 ${styles}`}
    >
      <View className="items-center my-auto">
        {image ? (
          <Image
            className="h-full w-full rounded-2xl "
            source={{ uri: image }}
          />
        ) : (
          <FontAwesomeIcon icon={faImage} color="#48138b" size={60} />
        )}
      </View>
    </TouchableOpacity>
  );
};
0;
