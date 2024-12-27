import React, { FC, useState } from "react";
import { Control, Controller, UseFormSetValue } from "react-hook-form";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  Image,
  StyleSheet,
  ImageSourcePropType,
} from "react-native";
import { FormValues } from "./TemplateModal";

const images = [
  {
    id: "1",
    uri: require("../../assets/gym.webp"),
  },
  {
    id: "2",
    uri: require("../../assets/gym.webp"),
  },
  {
    id: "3",
    uri: require("../../assets/gym.webp"),
  },
  {
    id: "4",
    uri: require("../../assets/gym.webp"),
  },
];

interface ImagePickerProps {
  form: {
    control: Control<FormValues>;
    setValue: UseFormSetValue<FormValues>;
  };
}

type ImageType = { id: string; uri: ImageSourcePropType };

export const ImagePicker: FC<ImagePickerProps> = ({
  form: { control, setValue },
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const selectImage = (id: string) => {
    setValue("image", id);
    setModalVisible(false);
  };

  const renderImage = ({ item }: { item: ImageType }) => {
    return (
      <TouchableOpacity
        style={styles.imageContainer}
        onPress={() => selectImage(item.id)}
      >
        <Image source={item.uri} style={styles.image} />
      </TouchableOpacity>
    );
  };

  return (
    <View>
      <Controller
        name="image"
        control={control}
        render={({ field: { value } }) => (
          <TouchableOpacity
            style={styles.selectButton}
            onPress={() => setModalVisible(true)}
          >
            {
              <Image
                source={
                  images.find((img) => img.id === value)?.uri ||
                  require("../../assets/plus.webp")
                }
                style={styles.selectedImagePreview}
              />
            }
          </TouchableOpacity>
        )}
      />

      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select an Image</Text>
            <FlatList
              data={images}
              keyExtractor={(item) => item.id}
              renderItem={renderImage}
              numColumns={1}
              scrollEnabled
              horizontal
              contentContainerStyle={styles.list}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  selectButton: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e0e0e0",
    borderRadius: 8,
  },
  selectButtonText: {
    fontSize: 16,
    color: "#555",
  },
  selectedImagePreview: {
    width: "100%",
    height: "100%",
    borderRadius: 8,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    backgroundColor: "white",
    marginHorizontal: 20,
    borderRadius: 8,
    padding: 20,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 20,
  },
  list: {
    alignItems: "center",
  },
  imageContainer: {
    margin: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    overflow: "hidden",
  },
  image: {
    width: 100,
    height: 100,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#007AFF",
    borderRadius: 8,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});
