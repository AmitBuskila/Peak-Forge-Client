import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import { loginToken } from "./slices/UserSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://192.168.1.100:8080",
  prepareHeaders: (headers, { getState }: { getState: any }) => {
    const token = getState().userSlice.token;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const customBaseQuery: typeof baseQuery = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQuery(args, api, extraOptions);
  if (result.error?.status === 403) {
    try {
      const refreshResult = (
        await baseQuery(
          { url: "/users/refreshToken", method: "POST" },
          api,
          extraOptions
        )
      ).data as { accessToken: string };
      console.log(refreshResult);

      await SecureStore.setItemAsync("USER_TOKEN", refreshResult.accessToken);
      console.log("New access token:", refreshResult.accessToken);
      api.dispatch(loginToken(refreshResult.accessToken));
    } catch (e) {
      console.log(e);
    }
  }

  return result;
};
