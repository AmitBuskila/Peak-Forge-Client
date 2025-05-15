import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

export const handleAndroidNotificationChannel = async () => {
  Notifications.setNotificationChannelAsync("default", {
    name: "Default",
    importance: Notifications.AndroidImportance.HIGH,
    sound: "default",
  });
};

export const registerForPushNotifications = async () => {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }

  if (finalStatus !== "granted") {
    return null;
  } else {
    if (Platform.OS === "android") {
      await handleAndroidNotificationChannel();
    }
    Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: false,
        shouldShowBanner: true,
        shouldShowList: true,
      }),
    });
  }

  // do something with it once notifications are from others
  return (await Notifications.getExpoPushTokenAsync()).data;
};

const cancelExistingNotification = async () => {
  const existingNotificationId = await AsyncStorage.getItem("notificationId");
  if (existingNotificationId) {
    Notifications.cancelScheduledNotificationAsync(existingNotificationId);
    AsyncStorage.removeItem("notificationId");
  }
};

export const schedulePushNotification = async (
  scheduledTime: number,
  exerciseName: string
): Promise<void> => {
  await cancelExistingNotification();
  const notificationId: string = await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏳ Rest’s Over!",
      body: `Time to smash your ${exerciseName}! 💪`,
      sound: "default", // todo get cool sound from an asset
    },
    trigger: new Date(
      Date.now() + scheduledTime
    ) as unknown as Notifications.DateTriggerInput,
  });
  AsyncStorage.setItem("notificationId", notificationId);
};
