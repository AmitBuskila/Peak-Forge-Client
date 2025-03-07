import { FC, useState } from "react";
import { Text, View } from "react-native";
import { FormField } from "../components/GenericComponents/FormField";
import { Control, useForm } from "react-hook-form";
import { FormValues } from "../contexts/WorkoutForm.context";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { useRegisterMutation } from "../store/apis/serverApi";
import { NavigationProp, useNavigation } from "@react-navigation/native";

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
      if (res?.error?.data?.includes("duplicate")) {
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
        />
        <FormField
          title={"Last Name"}
          control={control}
          controlName={"lastName"}
          styles="h-10"
        />
        <FormField
          title={"Email"}
          control={control}
          controlName={"email"}
          styles="h-10"
        />
        <FormField
          title={"Password"}
          control={control}
          controlName={"password"}
          styles="h-10"
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
