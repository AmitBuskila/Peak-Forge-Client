import React, { FC } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AnimatedFlatList from "../components/GenericComponents/AnimatedFlatList";
import { WorkoutTemplate } from "../components/Workouts/WorkoutTemplate";
import { useFetchUserData } from "../hooks/fetchUserData.hook";
import { UserSliceState } from "../store/slices/UserSlice";

export const HomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
  useFetchUserData();
  const templates = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user?.templates
  );

  return (
    <SafeAreaView>
      <ScrollView className="bg-primary h-full">
        <View className="mt-3 px-4">
          <Text className="text-3xl font-pblack color-secondary-200">
            My Templates
          </Text>
        </View>
        <View className="justify-center items-center ">
          {templates && (
            <AnimatedFlatList
              data={templates}
              renderItem={({ item }) => <WorkoutTemplate workout={item} />}
              horizontal={true}
            />
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
