import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useLoginMutation } from "../store/apis/serverApi";
import { loginToken } from "../store/slices/UserSlice";

export const useHandleLogin = () => {
  const [login] = useLoginMutation();
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const token = await SecureStore.getItemAsync("token");
      token
        ? dispatch(loginToken({ token }))
        : login({ email: "amit1bus@gmail.com", password: "Amit2004!" });
    })();
  }, []);
};
