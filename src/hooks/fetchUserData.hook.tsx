import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import {
  useLazyGetUserDataQuery,
  useLazyGetUserWorkoutsQuery,
} from "../store/apis/serverApi";
import { UserSliceState } from "../store/slices/UserSlice";

//todo timer not reset minutes on hour
export const useFetchUserData = () => {
  const token = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.token
  );
  const { decodedToken, isExpired } = useJwt(token!);
  const [getUserData] = useLazyGetUserDataQuery();
  const [getUserWorkouts] = useLazyGetUserWorkoutsQuery();

  useEffect(() => {
    if (decodedToken) {
      const userId: number = (decodedToken as { id: number }).id;
      getUserData(userId);
      getUserWorkouts(userId);
    }
  }, [decodedToken]);
};
