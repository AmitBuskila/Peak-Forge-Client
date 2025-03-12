import { createSlice, Slice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { User } from "../../entities/user.entity";
import { Workout } from "../../entities/workout.entity";
import { serverApi } from "../apis/serverApi";

export type UserSliceState = {
  token: string | null;
  user: User | null;
};

const initialState: UserSliceState = {
  token: null,
  user: null,
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
    builder.addMatcher(
      serverApi.endpoints.getUserData.matchFulfilled,
      (state: UserSliceState, action: { payload: User }) => {
        state.user = action.payload;
      }
    );
    builder.addMatcher(
      serverApi.endpoints.getUserWorkouts.matchFulfilled,
      (state: UserSliceState, action: { payload: Workout[] }) => {
        if (state.user) {
          state.user.workouts = [...action.payload];
        }
      }
    );
  },
});

export const { loginToken } = userSlice.actions;

export default userSlice.reducer;
