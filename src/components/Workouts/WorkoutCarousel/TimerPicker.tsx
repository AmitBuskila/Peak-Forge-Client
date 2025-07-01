import { Audio } from "expo-av";
import * as Haptics from "expo-haptics";
import { LinearGradient } from "expo-linear-gradient";
import React, { useEffect, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import { useWorkoutFormContext } from "../../../contexts/WorkoutForm.context";

export const TimerPicker = () => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const { setValue, getValues } = useWorkoutFormContext().form;
  const [currExerciseIndex] = useWorkoutFormContext().currExerciseIndex;
  const currentExerciseTimer: string | null =
    getValues(`exercises.${currExerciseIndex}.timer`) || null;

  const [alarmString, setAlarmString] = useState<string | null>(
    currentExerciseTimer
  );

  useEffect(() => {
    setAlarmString(currentExerciseTimer);
  }, [currExerciseIndex]);

  const formatTime = ({
    hours,
    minutes,
    seconds,
  }: {
    hours?: number;
    minutes?: number;
    seconds?: number;
  }) => {
    const timeParts = [];

    if (hours) {
      timeParts.push(hours.toString().padStart(2, "0"));
    }
    if (minutes !== undefined) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds !== undefined) {
      timeParts.push(seconds.toString().padStart(2, "0"));
    }

    return timeParts.join(":");
  };

  return (
    <View className="w-1/2">
      <TouchableOpacity activeOpacity={0.7} onPress={() => setShowPicker(true)}>
        <View>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setShowPicker(true)}
          >
            <View>
              <Text
                style={{
                  paddingVertical: 10,
                  paddingHorizontal: 18,
                  borderWidth: 1,
                  borderRadius: 10,
                  textAlign: "center",
                  fontSize: 16,
                  overflow: "hidden",
                  borderColor: "#C2C2C2",
                  color: "#C2C2C2",
                }}
              >
                {(alarmString || "Set Timer") + "⏳"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          const formattedTime: string = formatTime(pickedDuration);
          setValue(
            `exercises.${currExerciseIndex}.timer`,
            formatTime(pickedDuration)
          );
          setAlarmString(formattedTime);
          setShowPicker(false);
        }}
        modalTitle="Set Timer"
        onCancel={() => setShowPicker(false)}
        secondInterval={10}
        closeOnOverlayPress
        Audio={Audio}
        LinearGradient={LinearGradient}
        Haptics={Haptics}
        styles={{
          theme: "dark",
        }}
        modalProps={{
          overlayOpacity: 0.2,
        }}
      />
    </View>
  );
};
