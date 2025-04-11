import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import * as SecureStore from "expo-secure-store";
import { loginToken } from "./slices/UserSlice";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.EXPO_PUBLIC_API_URL,
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
      await SecureStore.setItemAsync("USER_TOKEN", refreshResult.accessToken);
      api.dispatch(loginToken(refreshResult.accessToken));
    } catch (e) {
      console.log(e);
    }
  }

  return result;
};
