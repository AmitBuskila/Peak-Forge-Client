import React, { FC } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import AnimatedFlatList from "../components/GenericComponents/AnimatedFlatList";
import { WorkoutTemplate } from "../components/Workouts/WorkoutTemplate";
import { WorkoutsSliceState } from "../store/slices/WorkoutSlice";

export const HomeScreen: FC<{ navigation: any }> = ({ navigation }) => {
  const workouts = useSelector(
    ({ workoutsSlice }: { workoutsSlice: WorkoutsSliceState }) =>
      workoutsSlice.workouts
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
          <AnimatedFlatList
            data={workouts}
            renderItem={({ item }) => <WorkoutTemplate template={item} />}
            horizontal={true}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
