import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { Text } from "react-native";
import { useAppContext } from "../contexts/AppContext.context";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const snapPoints = ["25%", "50%", "75%", "100%"];

  return (
    <BottomSheetModalProvider>
      <BottomSheetModal
        index={0}
        ref={modalRef}
        snapPoints={snapPoints}
        style={{ marginBottom: 10 }}
        enablePanDownToClose={true}
      >
        <BottomSheetView
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text>Content inside the Bottom Sheet</Text>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
