import { FC, useEffect } from "react";
import { useJwt } from "react-jwt";
import { useLazyGetUserDataQuery } from "../store/apis/serverApi";

export const useFetchUserData = (token: string) => {
  const { decodedToken, isExpired } = useJwt(token);
  const [getUserData] = useLazyGetUserDataQuery();
  const id: number | undefined = (decodedToken as { id: number })?.id;

  useEffect(() => {
    if (id) {
      getUserData(id);
    }
  }, [token]);
};
