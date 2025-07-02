import {
  NavigationProp,
  ParamListBase,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { FC, useState } from "react";
import { useForm } from "react-hook-form";
import { SafeAreaView, Text, View } from "react-native";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { DigitCode } from "../components/GenericComponents/DigitCode";
import { FormField } from "../components/GenericComponents/FormField";
import { useUpdateUserMutation } from "../store/apis/serverApi";

export const ForgotPasswordScreen: FC = () => {
  const route = useRoute();
  const [updateUser] = useUpdateUserMutation();
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<{ password: string }>();
  const email: string | undefined = (route.params as { referrer: string })
    ?.referrer;
  const navigation = useNavigation<NavigationProp<ParamListBase>>();

  const onSubmit = (data: { password: string }) => {
    updateUser({ email, password: data.password }).then((res) => {
      if (res.error) {
        console.error("Error updating password:", res.error);
      } else {
        navigation.navigate("Login");
      }
    });
  };

  return (
    <SafeAreaView className="bg-primary h-full">
      <View className="h-full my-[50%] mx-auto">
        {!isCodeCorrect ? (
          <View>
            <Text className="font-pbold text-md text-secondary-200 text-center my-4">
              Please enter the six digit code sent to your Email
            </Text>
            <DigitCode
              username={email}
              onCorrect={() => setIsCodeCorrect(true)}
              length={6}
            />
          </View>
        ) : (
          <View>
            <FormField
              control={control}
              controlName="password"
              title="New password"
              styles="h-10 w-[70vw]"
              rules={{
                required: "Required field",
                minLength: {
                  value: 8,
                  message: "Password must be at least 8 characters long",
                },
              }}
            />
            <View className="mt-10">
              <CustomButton
                title="Change Password"
                handlePress={handleSubmit(onSubmit, () => {})}
              />
            </View>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};
