import { NavigationProp, useNavigation } from "@react-navigation/native";
import { FC, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { useLoginMutation } from "../store/apis/serverApi";

export const LoginScreen: FC = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [login] = useLoginMutation();
  const navigation = useNavigation<NavigationProp<string>>();

  const handleSignUpClick = () => {
    navigation.navigate("Sign Up");
  };

  const handleForgotPassword = () => {
    console.log("Forgot password clicked");
  };

  const handleSignIn = () => {
    login({ email: username, password }).then((res) => {
      console.log(res);
      if (res.error) {
        setIsError(true);
      }
    });
  };

  return (
    <View className="bg-primary h-full">
      <View className="flex flex-col justify-center h-full w-[70vw] mx-auto">
        <Text className="text-3xl text-gray-100 font-pbold text-center mb-5">
          My Gym Bro💪
        </Text>
        <View className="mb-3">
          <Text className="text-base text-gray-100 font-pmedium">username</Text>
          <TextInput
            className={`border-2 border-black-200 bg-black-100 rounded-lg
           focus:border-secondary text-gray-100 h-10`}
            onChangeText={(value) => setUsername(value)}
            value={username}
            keyboardType="email-address"
          />
        </View>
        <View className="mb-3">
          <Text className="text-base text-gray-100 font-pmedium">password</Text>
          <TextInput
            className={`border-2 border-black-200 bg-black-100 rounded-lg
           focus:border-secondary text-gray-100 h-10`}
            onChangeText={(value) => setPassword(value)}
            value={password}
          />
        </View>
        {isError && (
          <Text className="text-red-500 font-pmedium text-center">
            Invalid username or password
          </Text>
        )}
        <View>
          <CustomButton title="Sign-in" handlePress={handleSignIn} />
        </View>
        <TouchableOpacity onPress={handleSignUpClick}>
          <Text className="underline text-gray-100 text-center font-pmedium mt-5">
            Don't have an account?
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text className="underline text-gray-100 font-pmedium text-center mt-2">
            Forgot password?
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
