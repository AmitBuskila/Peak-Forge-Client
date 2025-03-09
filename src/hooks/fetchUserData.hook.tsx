import { useEffect } from "react";
import { useJwt } from "react-jwt";
import { useSelector } from "react-redux";
import { useLazyGetUserDataQuery } from "../store/apis/serverApi";
import { UserSliceState } from "../store/slices/UserSlice";

export const useFetchUserData = () => {
  const userSlice = useSelector(
    ({ userSlice }: { userSlice: UserSliceState }) => userSlice
  );
  const { decodedToken, isExpired } = useJwt(userSlice.token!);
  const [getUserData] = useLazyGetUserDataQuery();
  const id: number | undefined = (decodedToken as { id: number })?.id;

  //todo fix bug not working on first load
  useEffect(() => {
    if (id) {
      getUserData(id);
    }
  }, [userSlice.token]);
};
