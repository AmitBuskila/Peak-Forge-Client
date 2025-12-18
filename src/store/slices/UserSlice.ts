import { createSlice, Slice } from "@reduxjs/toolkit";
import * as SecureStore from "expo-secure-store";
import { User } from "../../entities/user.entity";
import { Workout } from "../../entities/workout.entity";
import { serverApi } from "../apis/serverApi";
import { Exercise } from "../../entities/exercise.entity";
import { Template } from "../../entities/template.entity";

export type UserSliceState = {
  token: string | null;
  user: User | null;
  exercises: Exercise[];
};

const initialState: UserSliceState = {
  token: null,
  user: null,
  exercises: [],
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
    builder.addMatcher(
      serverApi.endpoints.getExercises.matchFulfilled,
      (state: UserSliceState, action: { payload: Exercise[] }) => {
        state.exercises = action.payload;
      }
    );
    builder.addMatcher(
      serverApi.endpoints.addTemplate.matchFulfilled,
      (state: UserSliceState, action: { payload: Template }) => {
        if (
          state.user &&
          !state.user?.templates.some(
            (template) => template?.id === action.payload.id
          )
        ) {
          state.user.templates = [...state.user.templates, action.payload];
        }
      }
    );
    builder.addMatcher(
      serverApi.endpoints.updateTemplate.matchFulfilled,
      (state: UserSliceState, action: { payload: Template }) => {
        if (state.user) {
          state.user.templates = state.user.templates.map((template) =>
            template.id === action.payload.id ? action.payload : template
          );
        }
      }
    );
    builder.addMatcher(
      serverApi.endpoints.removeTemplate.matchFulfilled,
      (state: UserSliceState, action: { payload: { deletedId: number } }) => {
        if (state.user) {
          state.user.templates = state.user.templates.filter(
            (template) => template.id !== action.payload.deletedId
          );
        }
      }
    );
  },
});

export const { loginToken } = userSlice.actions;

export default userSlice.reducer;
