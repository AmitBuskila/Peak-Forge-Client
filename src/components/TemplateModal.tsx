import React, { FC } from "react";
import { Controller, SubmitErrorHandler, useForm } from "react-hook-form";
import {
  Button,
  FlatList,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { ImagePicker } from "./imagePicker";

export interface FormValues {
  image: string;
  name: string;
  description: string;
}

export const TemplateModal: FC<{}> = () => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm<FormValues>();
  const onSubmit = (data: FormValues) => {
    console.log(data);
  };

  const renderImage = ({ item }: { item: any }) => {
    return (
      <TouchableOpacity
      // style={styles.imageContainer}
      // onPress={() => selectImage(item.id)}
      >
        <Image source={item.uri} />
      </TouchableOpacity>
    );
  };

  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View style={styles.container}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ flexDirection: "column", flex: 1 }}>
            <Text style={styles.label}>Template Name</Text>
            <Controller
              control={control}
              name="name"
              rules={{ required: true }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                />
              )}
            />
          </View>
          <View style={{ flexDirection: "column", marginLeft: 10 }}>
            <Text style={{ ...styles.label }}>Image</Text>
            <ImagePicker form={{ control, setValue }} />
          </View>
        </View>
        <Text style={styles.label}>Description (optional)</Text>
        <Controller
          control={control}
          name="description"
          rules={{ required: false }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={{ ...styles.input, height: 80 }}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              multiline={true}
              textAlignVertical="top"
            />
          )}
        />
        <FlatList
          data={[{ id: "1", uri: require("../../assets/gym.webp") }]}
          keyExtractor={(item) => item.id}
          renderItem={renderImage}
          numColumns={1}
          scrollEnabled
          horizontal
          // contentContainerStyle={styles.list}
        />

        <View style={styles.button}>
          <Button
            color={"black"}
            title="Create Template"
            onPress={handleSubmit(onSubmit)}
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "95%",
  },
  label: {
    fontSize: 16,
    color: "gray",
    marginTop: 20,
    marginBottom: 10,
    marginLeft: 0,
  },
  button: {
    marginTop: 40,
    color: "black",
    backgroundColor: "#a47bc9",
    borderRadius: 8,
  },
  input: {
    backgroundColor: "white",
    height: 40,
    padding: 10,
    borderRadius: 8,
  },
});
