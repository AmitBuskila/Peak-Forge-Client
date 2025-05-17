import {
  NavigationProp,
  ParamListBase,
  useNavigation,
} from "@react-navigation/native";
import { FC, useEffect, useState } from "react";
import { ScrollView, View } from "react-native";
import { useSelector } from "react-redux";
import { CustomSelectDropdown } from "../components/GenericComponents/SelectDropdown";
import { RepsAndWeightChart } from "../components/Statistics/RepsAndWeightChart";
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
          getLabel={(item) =>
            item?.name === "Specific Exercise" && selectedExercise?.name
              ? selectedExercise?.name
              : item.name
          }
        />
      </View>
      {selectedExercise && (
        <View className="mt-4">
          <RepsAndWeightChart
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
              <RepsAndWeightChart
                workSetsData={workSetsData}
                exerciseName={workSetsData[0]?.exerciseName}
              />
            </View>
          ))}
      </View>
    </ScrollView>
  );
};
