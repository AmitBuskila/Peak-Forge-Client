import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { ScrollView, Text, View } from "react-native";
import SelectDropdown from "react-native-select-dropdown";
import { useSelector } from "react-redux";
import { Chart } from "../components/Statistics/Chart";
import { Exercise } from "../entities/exercise.entity";
import { Template } from "../entities/template.entity";
import {
  useLazyGetExerciseStatsQuery,
  useLazyGetTemplateStatsQuery,
} from "../store/apis/serverApi";
import { UserSliceState } from "../store/slices/UserSlice";

export const Stats: FC = () => {
  const navigation = useNavigation<NavigationProp<ParamListBase>>();
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null
  );
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );
  const [selectedTemplate, setSelectedTemplate] = useState<Template | null>(
    null
  );
  const [getExerciseStats, { data: workSetsData }] =
    useLazyGetExerciseStatsQuery();
  const [getTemplateStats, { data, isFetching }] =
    useLazyGetTemplateStatsQuery();

  useEffect(() => {
    if (selectedExercise)
      getExerciseStats({ userId: user!.id, exerciseId: selectedExercise.id });
  }, [selectedExercise]);

  useEffect(() => {
    if (selectedTemplate) {
      getTemplateStats(selectedTemplate.id);
    }
  }, [selectedTemplate]);

  return (
    <ScrollView className="bg-primary h-full">
      <View className="mt-4">
        <SelectDropdown
          data={[...(user?.templates || []), { name: "Specific Exercise" }]}
          onSelect={(selectedItem) => {
            if (selectedItem.name === "Specific Exercise") {
              navigation.navigate("Exercises", {
                onSelect: (exercise: Exercise) => setSelectedExercise(exercise),
              });
              setSelectedTemplate(null);
            } else {
              setSelectedTemplate(selectedItem);
              setSelectedExercise(null);
            }
          }}
          renderButton={(selectedItem, isOpened) => (
            <View className=" h-12 bg-secondary-200 rounded-xl flex-row items-center px-3">
              <Text className="flex-1 text-base text-black-200 font-pmedium">
                {(selectedItem?.name === "Specific Exercise"
                  ? selectedExercise?.name || selectedItem?.name
                  : selectedItem?.name) || "Select Routine Stats to view"}
              </Text>
              <Text className="text-lg text-black-200">
                {isOpened ? "▲" : "▼"}
              </Text>
            </View>
          )}
          renderItem={(item) => (
            <View
              className={`w-full px-3 py-2 ${item.name === selectedTemplate?.name ? "bg-black-100" : "bg-primary"}`}
            >
              <Text className="text-base text-white font-pregular">
                {item.name}
              </Text>
            </View>
          )}
          dropdownStyle={{
            backgroundColor: "#161622",
            borderRadius: 8,
          }}
        />
      </View>
      {selectedExercise && (
        <View className="mt-4">
          <Chart
            workSetsData={workSetsData}
            exerciseName={selectedExercise?.name}
          />
        </View>
      )}
      <View className="mt-4">
        {!!data?.length &&
          selectedTemplate &&
          !isFetching &&
          data.map((workSetsData, index) => (
            <View className="mb-4" key={index}>
              <Chart
                workSetsData={workSetsData}
                exerciseName={workSetsData[0]?.exerciseName}
              />
            </View>
          ))}
      </View>
    </ScrollView>
  );
};
