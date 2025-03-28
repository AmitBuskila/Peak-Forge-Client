import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { pick } from "lodash";
import { KeyboardAvoidingView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { useSelector } from "react-redux";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { CustomHandle } from "../components/WorkoutModal/CustomHandle";
import { Countdown } from "../components/Workouts/Countdown";
import { WorkoutRoutine } from "../components/Workouts/WorkoutRoutine";
import { useAppContext } from "../contexts/AppContext.context";
import {
  FormValues,
  useWorkoutFormContext,
} from "../contexts/WorkoutForm.context";
import { Template } from "../entities/template.entity";
import { useLoadUnsavedData } from "../hooks/workout.hooks";
import {
  useAddWorkoutMutation,
  useUpdateTemplateMutation,
} from "../store/apis/serverApi";
import { UserSliceState } from "../store/slices/UserSlice";
import {
  formatTemplateToServer,
  formatWorkoutToServer,
} from "../utils/formatActions";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [addWorkout] = useAddWorkoutMutation();
  const [updateTemplate] = useUpdateTemplateMutation();
  const [activeWorkout, setActiveWorkout] = useAppContext().activeWorkout;
  const [currentExerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const { handleSubmit, reset } = useWorkoutFormContext().form;
  const snapPoints: string[] = ["8%", "80%", "100%"];
  const [timer, setTimer] = useAppContext().timer;
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );
  const navigation = useNavigation<NavigationProp<string>>();
  navigation.getState()?.routes[navigation.getState().index].state?.index;
  useLoadUnsavedData();

  const handleFinishWorkout = (data: FormValues) => {
    updateTemplate({
      templateId: activeWorkout?.id!,
      template: pick(
        formatTemplateToServer(data, user?.id!),
        "workoutExercises"
      ),
    });
    addWorkout(formatWorkoutToServer(data, user?.id!, activeWorkout?.id!)).then(
      () => {
        modalRef.current?.dismiss();
      }
    );
  };

  // todo make modal height scrollable with keyboard
  return (
    <BottomSheetModalProvider>
      {!!timer.key && (
        <Countdown duration={timer.duration} timerKey={timer.key} />
      )}
      <BottomSheetModal
        ref={modalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: "#232533" }}
        bottomInset={getStatusBarHeight() + 2}
        onDismiss={() => {
          setTimer({ key: 0, duration: 0 });
          setActiveWorkout(null);
          AsyncStorage.removeItem("workoutData");
          AsyncStorage.removeItem("activeWorkout");
          reset({ totalTime: 0, exercises: [] });
        }}
        handleComponent={CustomHandle}
      >
        <BottomSheetScrollView>
          <KeyboardAvoidingView
            behavior={"position"}
            keyboardVerticalOffset={
              (activeWorkout?.workoutExercises[currentExerciseIndex]?.sets
                .length || 1) * 50
            }
            enabled
          >
            <WorkoutRoutine template={activeWorkout as Template} />
            <CustomButton
              title="Finish Workout"
              handlePress={handleSubmit(handleFinishWorkout)}
            />
          </KeyboardAvoidingView>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
