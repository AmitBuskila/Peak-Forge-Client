import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import { useLazyGetUserDataQuery } from "../store/apis/serverApi";
import { UserSliceState } from "../store/slices/UserSlice";

export const useFetchUserData = () => {
  const token = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice.token
  );
  const { decodedToken, isExpired } = useJwt(token!);
  const [getUserData] = useLazyGetUserDataQuery();

  useEffect(() => {
    if (decodedToken) {
      getUserData((decodedToken as { id: number }).id);
    }
  }, [decodedToken]);
};
