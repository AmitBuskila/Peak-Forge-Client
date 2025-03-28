import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { pick } from "lodash";
import { useState } from "react";
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
import { useLoadUnsavedData, useProgressWorkout } from "../hooks/workout.hooks";
import {
  useAddWorkoutMutation,
  useUpdateTemplateMutation,
} from "../store/apis/serverApi";
import { UserSliceState } from "../store/slices/UserSlice";
import {
  formatTemplateToServer,
  formatWorkoutToServer,
} from "../utils/formatActions";
import {
  NavigationProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [addWorkout] = useAddWorkoutMutation();
  const [updateTemplate] = useUpdateTemplateMutation();
  const [activeWorkout, setActiveWorkout] = useAppContext().activeWorkout;
  const [currentExerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const { handleSubmit, reset } = useWorkoutFormContext().form;
  const snapPoints: string[] = ["8%", "80%", "100%"];
  const [duration, setDuration] = useState<number>(0);
  const [timerKey, setTimerKey] = useState<number>(0);
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );
  const navigation = useNavigation<NavigationProp<string>>();
  const homeStackIndex: number | undefined =
    navigation.getState()?.routes[navigation.getState().index].state?.index;
  const isShowTimer: boolean =
    !!activeWorkout && timerKey > 1 && !homeStackIndex;

  useProgressWorkout({ setDuration, setTimerKey });
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
      {isShowTimer && <Countdown duration={duration} timerKey={timerKey} />}
      <BottomSheetModal
        ref={modalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: "#232533" }}
        bottomInset={getStatusBarHeight() + 2}
        onDismiss={() => {
          setTimerKey(0);
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
