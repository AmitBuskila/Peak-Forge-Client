import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { useEffect, useMemo, useState } from "react";
import { useWatch } from "react-hook-form";
import { KeyboardAvoidingView } from "react-native";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Workout } from "../../types/template";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { CustomHandle } from "../components/WorkoutModal/CustomHandle";
import { Countdown } from "../components/Workouts/Countdown";
import { WorkoutRoutine } from "../components/Workouts/WorkoutRoutine";
import { useAppContext } from "../contexts/AppContext.context";
import {
  FormExercise,
  useWorkoutFormContext,
} from "../contexts/WorkoutForm.context";
import { getRestTime } from "../hooks/getRestTime.hook";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [activeWorkout] = useAppContext().activeWorkout;
  const [curr] = useWorkoutFormContext().currExerciseIndex;
  const { control } = useWorkoutFormContext().form;
  const snapPoints: string[] = ["8%", "80%", "100%"];
  const exercises: FormExercise[] = useWatch({ control, name: "exercises" });
  const [duration, setDuration] = useState<number>(0);
  const [timerKey, setTimerKey] = useState<number>(0);

  const doneStates: (number | undefined)[][] = exercises?.map((exercise) =>
    exercise?.sets?.map((set) => set.done)
  );

  useEffect(() => {
    const restTime: number = getRestTime(exercises);
    setDuration(restTime);
    setTimerKey((prev) => prev + 1);
  }, [JSON.stringify(doneStates)]);

  // todo make modal height scrollable with keyboard
  return (
    <BottomSheetModalProvider>
      {!!activeWorkout && !!duration && (
        <Countdown duration={duration} key={timerKey} />
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
              (activeWorkout?.exercises[curr]?.sets.length || 1) * 50
            }
            enabled
          >
            <WorkoutRoutine workout={activeWorkout as Workout} />
            <CustomButton
              title="Finish Workout"
              handlePress={() => {
                modalRef.current?.close();
              }}
            />
          </KeyboardAvoidingView>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
