import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useEffect, useState } from "react";
import { useWatch } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
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
import { getRestTime } from "../hooks/getRestTime.hook";
import { useAddWorkoutMutation } from "../store/apis/serverApi";
import { formatWorkoutToServer } from "../utils/formatActions";
import { useSelector } from "react-redux";
import { UserSliceState } from "../store/slices/UserSlice";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [addWorkout] = useAddWorkoutMutation();
  const [activeWorkout] = useAppContext().activeWorkout;
  const [curr] = useWorkoutFormContext().currExerciseIndex;
  const { control, handleSubmit } = useWorkoutFormContext().form;
  const snapPoints: string[] = ["8%", "80%", "100%"];
  const exercises: FormExercise[] = useWatch({ control, name: "exercises" });
  const [duration, setDuration] = useState<number>(0);
  const [timerKey, setTimerKey] = useState<number>(0);
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );

  const doneStates: (number | undefined)[][] = exercises?.map((exercise) =>
    exercise?.sets?.map((set) => set.done)
  );

  useEffect(() => {
    const restTime: number = getRestTime(exercises);
    setDuration(restTime);
    setTimerKey((prev) => prev + 1);
  }, [JSON.stringify(doneStates)]);

  const handleFinishWorkout = (data: FormValues) => {
    addWorkout(formatWorkoutToServer(data, user?.id!, activeWorkout?.id!));
    modalRef.current?.close();
  };

  // todo make modal height scrollable with keyboard
  return (
    <BottomSheetModalProvider>
      {!!activeWorkout && !!duration && (
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
              (activeWorkout?.workoutExercises[curr]?.sets.length || 1) * 50
            }
            enabled
          >
            <WorkoutRoutine workout={activeWorkout as Template} />
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
