import * as SecureStore from "expo-secure-store";
import { FC } from "react";
import { View } from "react-native";
import { useDispatch } from "react-redux";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { loginToken } from "../store/slices/UserSlice";
import { SafeAreaView } from "react-native-safe-area-context";

export const ProfileScreen: FC = () => {
  const dispatch = useDispatch();

  return (
    <SafeAreaView className="bg-primary h-full">
      <CustomButton
        title="Sign out"
        handlePress={() => {
          dispatch(loginToken({ token: null }));
          SecureStore.deleteItemAsync("USER_TOKEN");
        }}
      />
    </SafeAreaView>
  );
};
