import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
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
  FormExercise,
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
import { useWatch } from "react-hook-form";
import { pick } from "lodash";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [addWorkout] = useAddWorkoutMutation();
  const [updateTemplate] = useUpdateTemplateMutation();
  const [activeWorkout, setActiveWorkout] = useAppContext().activeWorkout;
  const [currentExerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const { handleSubmit, reset, control } = useWorkoutFormContext().form;
  const exercises: FormExercise[] = useWatch({ control, name: "exercises" });
  const snapPoints: string[] = ["8%", "80%", "100%"];
  const [duration, setDuration] = useState<number>(0);
  const [timerKey, setTimerKey] = useState<number>(0);
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );

  //todo think of better way
  const isStartedWorkout: boolean =
    !exercises.length ||
    (!currentExerciseIndex && exercises[0]?.sets.every((set) => !set.done));

  useProgressWorkout({ setDuration, setTimerKey });
  useLoadUnsavedData();

  const handleFinishWorkout = (data: FormValues) => {
    // console.log(formatWorkoutToServer(data, user?.id!, activeWorkout?.id!));
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
        setActiveWorkout(null);
        AsyncStorage.removeItem("workoutData");
        AsyncStorage.removeItem("activeWorkout");
        reset();
      }
    );
  };

  // todo make modal height scrollable with keyboard
  return (
    <BottomSheetModalProvider>
      {!!activeWorkout && !isStartedWorkout && (
        <Countdown duration={duration} timerKey={timerKey} />
      )}
      <BottomSheetModal
        ref={modalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: "#232533" }}
        bottomInset={getStatusBarHeight() + 2}
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
