import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { TimerPickerModal } from "react-native-timer-picker";
import { Audio } from "expo-av";
import * as Haptics from "expo-haptics"; // for haptic feedback

export const TimerPicker = () => {
  const [showPicker, setShowPicker] = useState<boolean>(false);
  const [alarmString, setAlarmString] = useState<string | null>(null);

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
    if (minutes) {
      timeParts.push(minutes.toString().padStart(2, "0"));
    }
    if (seconds) {
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
                Set Timer ⏳
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
      <TimerPickerModal
        visible={showPicker}
        setIsVisible={setShowPicker}
        onConfirm={(pickedDuration) => {
          setAlarmString(formatTime(pickedDuration));
          setShowPicker(false);
        }}
        modalTitle="Set Alarm"
        onCancel={() => setShowPicker(false)}
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
