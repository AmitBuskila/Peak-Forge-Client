import AsyncStorage from "@react-native-async-storage/async-storage";
import { FC, useEffect, useState } from "react";
import { Alert, Button, StyleSheet, Text, View } from "react-native";
import { useAppContext } from "../../contexts/AppContext.context";
import { useWorkoutFormContext } from "../../contexts/WorkoutForm.context";
import { useBackgroundTimer } from "../../hooks/useBackgroundTimer";

export const CustomHandle: FC = () => {
  const [activeWorkout] = useAppContext().activeWorkout;
  const { setValue } = useWorkoutFormContext().form;
  const modalRef = useAppContext().activeWorkoutModalRef;
  const totalTime = useBackgroundTimer(18000); //5 hours max
  const [passedTime, setPassedTime] = useState<number>(0);

  useEffect(() => {
    (async () => {
      const workoutData = await AsyncStorage.getItem("workoutData");
      if (workoutData) {
        setPassedTime(JSON.parse(workoutData).totalTime);
      }
    })();
  }, []);

  useEffect(() => {
    setValue("totalTime", totalTime + passedTime);
  }, [totalTime, passedTime]);

  const formatTimer = (totalTime: number): string => {
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
            {formatTimer(totalTime + passedTime)}
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
