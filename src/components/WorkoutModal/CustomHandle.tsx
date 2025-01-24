import { View, StyleSheet, Text, Button } from "react-native";
import { useAppContext } from "../../contexts/AppContext.context";
import { useEffect, useState } from "react";

export const CustomHandle = () => {
  const [activeWorkout, setActiveWorkout] = useAppContext().activeWorkout;
  const modalRef = useAppContext().activeWorkoutModalRef;
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTimer = (time: number): string => {
    const hours: number = Math.floor(time / 3600);
    const minutes: number = Math.floor(time / 60);
    let seconds: number = time % 60;
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
              modalRef.current?.dismiss();
              setActiveWorkout(null);
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
            {formatTimer(timer)}
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
