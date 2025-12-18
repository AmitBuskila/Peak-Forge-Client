import { faImage } from "@fortawesome/free-solid-svg-icons/faImage";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import * as FileSystem from 'expo-file-system/legacy';
import * as ImagePicker from "expo-image-picker";
import React, { FC } from "react";
import { FieldValues, SetFieldValue } from "react-hook-form";
import { Alert, Image, TouchableOpacity, View } from "react-native";

export const CustomImagePicker: FC<{
  styles: string;
  setImageUri: SetFieldValue<FieldValues>;
  uri?: string;
}> = ({ styles, setImageUri, uri }) => {
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== "granted") {
      Alert.alert(
        "Permission Denied",
        `Sorry, we need camera roll permission to upload images.`
      );
    } else {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
      });
      // todo migrate to not use legacy
      if (!result.canceled) {
        const localUri: string = result?.assets?.[0].uri;
        const fileName: string = localUri.split("/").pop() || "";
        const newPathUrl: string = `${FileSystem.documentDirectory}${fileName}`;
        await FileSystem.copyAsync({
          from: localUri,
          to: newPathUrl,
        });
        setImageUri("image", newPathUrl);
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
        {uri ? (
          <Image className="h-full w-full rounded-2xl " source={{ uri }} />
        ) : (
          <FontAwesomeIcon icon={faImage} color="#48138b" size={60} />
        )}
      </View>
    </TouchableOpacity>
  );
};
0;
