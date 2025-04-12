import { FC, useState } from "react";
import { View, Text, TextInput } from "react-native";
import { DigitCode } from "../components/GenericComponents/DigitCode";
import { useForm } from "react-hook-form";
import { FormField } from "../components/GenericComponents/FormField";
import { CustomButton } from "../components/GenericComponents/CustomButton";

export const ForgotPasswordScreen: FC = () => {
  const [isCodeCorrect, setIsCodeCorrect] = useState<boolean>(false);
  const { control, handleSubmit } = useForm<{ password: string }>();

  const onSubmit = (data: { password: string }) => {};

  return (
    <View className="bg-primary h-full">
      <View className="h-full my-[50%] mx-auto">
        {!isCodeCorrect ? (
          <View>
            <Text className="font-pbold text-md text-secondary-200 text-center my-4">
              Please enter the six digit code sent to your Email
            </Text>
            <DigitCode onSubmit={(text) => setIsCodeCorrect(true)} length={6} />
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
    </View>
  );
};
