import {
  BottomSheetModal,
  BottomSheetModalProvider,
  BottomSheetScrollView,
} from "@gorhom/bottom-sheet";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { pick } from "lodash";
import { Alert, Button, View } from "react-native";
import { KeyboardAccessoryView } from "react-native-keyboard-accessory";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const ActiveWorkout = () => {
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [addWorkout] = useAddWorkoutMutation();
  const [updateTemplate] = useUpdateTemplateMutation();
  const [activeWorkout, setActiveWorkout] = useAppContext().activeWorkout;
  const { handleSubmit, reset } = useWorkoutFormContext().form;
  const snapPoints: string[] = ["7%", "95%"];
  const [timer, setTimer] = useAppContext().timer;
  const user = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.user
  );
  const navigation = useNavigation<NavigationProp<string>>();
  navigation.getState()?.routes[navigation.getState().index].state?.index;
  useLoadUnsavedData();
  const insets = useSafeAreaInsets();

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

  return (
    <BottomSheetModalProvider>
      {!!timer.key && (
        <Countdown
          duration={timer.duration}
          timerKey={timer.key}
          setTimerKey={setTimer}
        />
      )}
      <KeyboardAccessoryView>
        <View className="z-10 bg-[#232533]">
          <Button title="Send" onPress={() => console.log("Sent")} />
        </View>
      </KeyboardAccessoryView>

      <BottomSheetModal
        ref={modalRef}
        index={1}
        snapPoints={snapPoints}
        enablePanDownToClose={false}
        enableContentPanningGesture={false}
        backgroundStyle={{ backgroundColor: "#232533" }}
        bottomInset={insets.bottom + getStatusBarHeight() + 2}
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
          <KeyboardAwareScrollView
            enableOnAndroid={true}
            keyboardShouldPersistTaps="always"
            keyboardOpeningTime={Math.pow(999999, 2)} // solves internal bug
            extraHeight={20}
          >
            <WorkoutRoutine template={activeWorkout as Template} />
            <View className="mt-2">
              <CustomButton
                title="Finish Workout"
                handlePress={handleSubmit((data) =>
                  Alert.alert("Finish Workout", "Are you sure?", [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "Confirm",
                      isPreferred: true,
                      onPress: () => handleFinishWorkout(data),
                    },
                  ])
                )}
              />
            </View>
          </KeyboardAwareScrollView>
        </BottomSheetScrollView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};
