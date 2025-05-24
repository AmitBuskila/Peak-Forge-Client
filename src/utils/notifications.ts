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

export const schedulePushNotification = async (
  scheduledTime: number,
  exerciseName: string
): Promise<void> => {
  await Notifications.cancelAllScheduledNotificationsAsync();
  Notifications.scheduleNotificationAsync({
    content: {
      title: "⏳ Rest’s Over!",
      body: `Time to smash your ${exerciseName}! 💪`,
      sound: "default", // todo get cool sound from an asset
      data: { exerciseName },
    },
    trigger: new Date(
      Date.now() + scheduledTime
    ) as unknown as Notifications.DateTriggerInput,
  });
};
