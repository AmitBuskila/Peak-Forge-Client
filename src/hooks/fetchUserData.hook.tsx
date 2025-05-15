import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import {
  useLazyGetExercisesQuery,
  useLazyGetUserDataQuery,
  useLazyGetUserWorkoutsQuery,
} from "../store/apis/serverApi";
import { UserSliceState } from "../store/slices/UserSlice";
import * as SplashScreen from "expo-splash-screen";
import { registerForPushNotifications } from "../utils/notifications";

export const useFetchData = () => {
  const token = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.token
  );
  const { decodedToken } = useJwt(token!);
  const [getUserData] = useLazyGetUserDataQuery();
  const [getUserWorkouts] = useLazyGetUserWorkoutsQuery();
  const [getExercises] = useLazyGetExercisesQuery();

  useEffect(() => {
    const userId: number = (decodedToken as { id: number })?.id;
    if (userId) {
      SplashScreen.preventAutoHideAsync();
      getUserData(userId);
      getUserWorkouts(userId);
      getExercises().then(() => SplashScreen.hideAsync());
      registerForPushNotifications();
    }
  }, [decodedToken]);
};
