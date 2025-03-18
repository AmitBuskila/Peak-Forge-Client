import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../../contexts/AppContext.context";
import { useWorkoutFormContext } from "../../contexts/WorkoutForm.context";
import { useBackgroundTimer } from "../../hooks/useBackgroundTimer";

export const CustomHandle = () => {
  const [activeWorkout, setActiveWorkout] = useAppContext().activeWorkout;
  const { reset } = useWorkoutFormContext().form;
  const modalRef = useAppContext().activeWorkoutModalRef;
  const totalTime = useBackgroundTimer();

  const formatTimer = (): string => {
    const hours: number = Math.floor(totalTime / 3600);
    const minutes: number = Math.floor(totalTime / 60) % 60;
    let seconds: number = totalTime % 60;
    return `${hours > 0 ? hours + ":" : ""}${minutes < 10 ? "0" + minutes : minutes}:${(seconds < 10 ? "0" : "") + seconds}`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.handleIndicator} />
      <View style={styles.workoutData}>
        <View style={{ width: 100 }}>
          <Button
            title="Discard?"
            color={"#FF4D4F"}
            onPress={() => {
              Alert.alert(
                "Discard workout",
                "Are you sure you want to proceed?",
                [
                  {
                    text: "Confirm",
                    onPress: async () => {
                      modalRef.current?.dismiss();
                      setActiveWorkout(null);
                      AsyncStorage.removeItem("workoutData");
                      AsyncStorage.removeItem("activeWorkout");
                      reset({ totalTime: 0, exercises: [] });
                    },
                  },
                  {
                    text: "Cancel",
                    style: "cancel",
                    onPress: () => {},
                  },
                ]
              );
            }}
          />
        </View>
        {/* todo make text responsive with special component*/}
        <View>
          <Text style={styles.text} className="font-pblack color-white">
            {activeWorkout?.name}
          </Text>
        </View>
        <View style={{ width: 100, alignItems: "flex-end" }}>
          <Text
            style={[styles.text, { marginRight: 10 }]}
            className="font-pblack color-secondary-100"
          >
            {formatTimer()}
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginTop: 4,
    height: 60,
    alignItems: "center",
  },
  workoutData: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  text: {
    fontSize: 20,
    fontWeight: "bold",
  },
  handleIndicator: {
    width: 40,
    height: 6,
    backgroundColor: "#ccc",
    borderRadius: 3,
  },
});
