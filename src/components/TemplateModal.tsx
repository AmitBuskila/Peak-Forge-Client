import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { useForm, SubmitErrorHandler, Controller } from "react-hook-form";
import {
  Button,
  ScrollView,
  Text,
  TextInput,
  View,
  StyleSheet,
} from "react-native";

type FormValues = {
  email: string;
  password: string;
};

export const TemplateModal: FC<{}> = () => {
  const {
    register,
    setValue,
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };

  const onError: SubmitErrorHandler<FormValues> = (errors, e) => {
    return console.log(errors);
  };
  return (
    <ScrollView
      contentContainerStyle={{
        justifyContent: "center",
        flexDirection: "row",
      }}
    >
      <View style={styles.container}>
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
        <Text style={styles.label}>Description (optional)</Text>
        <Controller
          control={control}
          name="description"
          rules={{ required: false }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
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
