import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { Text, View } from "react-native";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { FormField } from "../components/GenericComponents/FormField";
import { useRegisterMutation } from "../store/apis/serverApi";

export interface SignUpFormValues {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

export const SignUpScreen: FC = () => {
  const { control, handleSubmit, getValues } = useForm<SignUpFormValues>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    },
  });
  const navigation = useNavigation<NavigationProp<string>>();
  const [helperText, setHelperText] = useState<string>("");
  const [register] = useRegisterMutation();

  const onError = () => {
    console.log("Error occurred", getValues());
  };

  const onSubmit = (data: SignUpFormValues) => {
    register(data).then((res: any) => {
      console.log(res);
      if (res?.error?.data?.detail?.includes("already exists")) {
        setHelperText("Email already linked to an account");
      } else if (res.error) {
        setHelperText("Error occurred");
      }
      if (res.data?.success) {
        navigation.navigate("Login");
      }
    });
  };

  return (
    <View className="bg-primary h-full">
      <View className="justify-center h-full w-[70vw] mx-auto">
        <FormField
          title={"First Name"}
          control={control}
          controlName={"firstName"}
          styles="h-10"
          rules={{
            minLength: {
              value: 2,
              message: "First name must be at least 2 characters long",
            },
            required: "Required field",
          }}
        />
        <FormField
          title={"Last Name"}
          control={control}
          controlName={"lastName"}
          styles="h-10"
          rules={{
            minLength: {
              value: 2,
              message: "Last name must be at least 2 characters long",
            },
            required: "Required field",
          }}
        />
        <FormField
          title={"Email"}
          control={control}
          controlName={"email"}
          styles="h-10"
          rules={{
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@gmail\.com$/,
              message: "Enter a valid Gmail address (e.g, example@gmail.com)",
            },
            required: "Required field",
          }}
        />
        <FormField
          title={"Password"}
          control={control}
          controlName={"password"}
          styles="h-10"
          rules={{
            required: "Required field",
            minLength: {
              value: 8,
              message: "Password must be at least 8 characters long",
            },
          }}
        />
        {!!helperText && (
          <Text className="text-red-500 font-pmedium text-center">
            {helperText}
          </Text>
        )}
        <View className="mt-5">
          <CustomButton
            title="Sign Up"
            handlePress={handleSubmit(onSubmit, onError)}
          />
        </View>
      </View>
    </View>
  );
};
