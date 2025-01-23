import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import { getStatusBarHeight } from "react-native-status-bar-height";
import { Workout } from "../../types/template";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { WorkoutRoutine } from "../components/Workouts/WorkoutRoutine";
import { useAppContext } from "../contexts/AppContext.context";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [activeWorkout] = useAppContext().activeWorkout;
  const snapPoints = ["25%", "50%", "80%", "100%"];

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: "#5f2aa1" }}
        containerStyle={{ marginBottom: getStatusBarHeight() }}
      >
        <BottomSheetScrollView>
          <WorkoutRoutine workout={activeWorkout as Workout} />
          <CustomButton
            title="Finish Workout"
            handlePress={() => {
              modalRef.current?.close();
            }}
          />
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
