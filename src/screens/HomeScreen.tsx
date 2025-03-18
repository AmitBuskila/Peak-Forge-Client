import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { FC, useEffect } from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AnimatedFlatList from "../components/GenericComponents/AnimatedFlatList";
import { WorkoutTemplate } from "../components/Workouts/WorkoutTemplate";
import { useAppContext } from "../contexts/AppContext.context";
import { useFetchData } from "../hooks/fetchUserData.hook";
import { UserSliceState } from "../store/slices/UserSlice";
import { useLoadUnsavedWorkout } from "../hooks/workout.hooks";

export const HomeScreen: FC = () => {
  useFetchData();
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );
  useLoadUnsavedWorkout(user);

  return (
    <SafeAreaView>
      <ScrollView className="bg-primary h-full">
        <View className="mt-3 px-4">
          <Text className="text-3xl font-pblack color-secondary-200">
            My Templates
          </Text>
        </View>
        <View className="justify-center items-center ">
          <AnimatedFlatList
            data={user?.templates || []}
            renderItem={({ item }) => <WorkoutTemplate template={item} />}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
