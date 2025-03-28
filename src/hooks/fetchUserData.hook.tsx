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

export const useFetchData = () => {
  const token = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.token
  );
  const { decodedToken, isExpired } = useJwt(token!);
  const [getUserData] = useLazyGetUserDataQuery();
  const [getUserWorkouts] = useLazyGetUserWorkoutsQuery();
  const [getExercises] = useLazyGetExercisesQuery();

  useEffect(() => {
    if (decodedToken) {
      const userId: number = (decodedToken as { id: number }).id;
      getUserData(userId);
      getUserWorkouts(userId);
      getExercises().then(() => SplashScreen.hideAsync());
    }
  }, [decodedToken]);
};
