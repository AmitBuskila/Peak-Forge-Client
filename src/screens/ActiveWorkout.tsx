import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Workout } from "../../types/template";
import { CustomButton } from "../components/GenericComponents/CustomButton";
import { WorkoutRoutine } from "../components/Workouts/WorkoutRoutine";
import { useAppContext } from "../contexts/AppContext.context";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [activeWorkout] = useAppContext().activeWorkout;
  const snapPoints = ["3%", "8%", "95%", "100%"];

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        ref={modalRef}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: "#5f2aa1" }}
      >
        <BottomSheetView>
          <WorkoutRoutine workout={activeWorkout as Workout} />
          <CustomButton
            title="Finish Workout"
            handlePress={() => {
              modalRef.current?.close();
            }}
          />
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
