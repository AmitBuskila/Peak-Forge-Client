import { createSlice, Slice } from "@reduxjs/toolkit";
import { serverApi } from "../apis/serverApi";
import * as SecureStore from "expo-secure-store";

export type UserSliceState = {
  token: string | null;
};

const initialState: UserSliceState = {
  token: null,
};

const userSlice: Slice = createSlice({
  name: "userSlice",
  initialState,
  reducers: {
    loginToken(state: UserSliceState, action: { payload: { token: string } }) {
      state.token = action.payload.token;
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      serverApi.endpoints.login.matchFulfilled,
      (state: UserSliceState, action: { payload: { token: string } }) => {
        state.token = action.payload.token;
        SecureStore.setItemAsync("USER_TOKEN", action.payload.token);
      }
    );
  },
});

export const { loginToken } = userSlice.actions;

export default userSlice.reducer;
