import { template } from "@babel/core";
import { createSlice, Slice } from "@reduxjs/toolkit";
import { Workout } from "../../../types/template";

export type WorkoutsSliceState = {
  workouts: Workout[];
  activeWorkout: Workout | null;
};

const initialState: WorkoutsSliceState = {
  workouts: [],
  activeWorkout: null,
};

export type addTemplateAction = {
  payload: Workout;
};

const workoutsSlice: Slice = createSlice({
  name: "workoutsSlice",
  initialState,
  reducers: {
    addWorkoutTemplate: (state: WorkoutsSliceState, { payload }) => {
      state.workouts = [...state.workouts, payload];
    },
  },
});

export const { addWorkoutTemplate } = workoutsSlice.actions;

export default workoutsSlice.reducer;
