import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { CustomSelectDropdown } from "../components/GenericComponents/SelectDropdown";
import { getChartResolver } from "../components/Statistics/utils";
import { WeightChart } from "../components/Statistics/WeightChart";
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
  const [
    getExerciseStats,
    { data: exerciseData, isFetching: isFetchingExercise },
  ] = useLazyGetExerciseStatsQuery();
  const [
    getTemplateStats,
    { data: templateData, isFetching: isFetchingTemplate },
  ] = useLazyGetTemplateStatsQuery();

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
        <CustomSelectDropdown
          options={[...(user?.templates || []), { name: "Specific Exercise" }]}
          onSelect={(selectedItem) => {
            if (selectedItem.name === "Specific Exercise") {
              navigation.navigate("Exercises", {
                onSelect: (exercise: Exercise) => setSelectedExercise(exercise),
              });
              setSelectedTemplate(null);
            } else {
              setSelectedTemplate(selectedItem as Template);
              setSelectedExercise(null);
            }
          }}
          selectedItem={selectedTemplate || selectedExercise}
          placeholder="Select Routine Stats to view"
          getLabel={(item) => item.name}
        />
      </View>
      {(exerciseData || templateData) &&
        getChartResolver(
          selectedExercise,
          selectedTemplate,
          (selectedTemplate ? templateData : exerciseData)!,
          isFetchingExercise || isFetchingTemplate
        )}
      <WeightChart
        exerciseName={selectedExercise?.name || ""}
        workSetsData={exerciseData || []}
      />
    </ScrollView>
  );
};
