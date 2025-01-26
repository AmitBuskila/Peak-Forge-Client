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
import { CustomHandle } from "../components/WorkoutModal/CustomHandle";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [activeWorkout] = useAppContext().activeWorkout;
  const snapPoints = ["8%", "80%", "100%"];

  return (
    <BottomSheetModalProvider>
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
