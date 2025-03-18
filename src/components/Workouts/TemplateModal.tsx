import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { FC } from "react";
import { useWatch } from "react-hook-form";
import { KeyboardAvoidingView, ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import {
  FormValues,
  useWorkoutFormContext,
} from "../../contexts/WorkoutForm.context";
import { useAddTemplateMutation } from "../../store/apis/serverApi";
import { UserSliceState } from "../../store/slices/UserSlice";
import { formatTemplateToServer } from "../../utils/formatActions";
import { CustomButton } from "../GenericComponents/CustomButton";
import { CustomImagePicker } from "../GenericComponents/CustomImagePicker";
import { FormField } from "../GenericComponents/FormField";
import { WorkoutRoutine } from "./WorkoutRoutine";

//todo fix exit not reseting states
export const TemplateModal: FC<{}> = () => {
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );
  const { control, setValue, getValues, handleSubmit } =
    useWorkoutFormContext().form;
  const [addTemplate] = useAddTemplateMutation();
  const navigation = useNavigation<NavigationProp<string>>();
  const image = useWatch({ control, name: "image" });

  const onSubmit = (data: FormValues) => {
    addTemplate(formatTemplateToServer(data, user?.id!));
    navigation.navigate("Home");
  };

  const onError = () => {
    console.log("Error occurred", getValues());
  };

  return (
    <KeyboardAvoidingView
      behavior={"height"}
      keyboardVerticalOffset={100}
      enabled
    >
      <ScrollView className="bg-primary h-full">
        <View className="w-full justify-center h-full px-4 my-4">
          <FormField
            title="Workout Name"
            controlName="workoutName"
            control={control}
            styles="w-full h-14"
          />
          <View className="my-2 flex flex-row items-center">
            <FormField
              title="Description"
              controlName="description"
              control={control}
              styles="w-[66vw] h-28"
              multiline={true}
            />
            <CustomImagePicker
              styles="w-[24vw] h-28 mx-4 mt-5"
              setImageUri={setValue}
              uri={image}
            />
          </View>
          <View className="my-6">
            <WorkoutRoutine />
          </View>

          <CustomButton
            title="Create Template"
            handlePress={handleSubmit(onSubmit, onError)}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};
