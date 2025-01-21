import { createSlice, Slice } from "@reduxjs/toolkit";
import { Workout } from "../../../types/template";

export type WorkoutsSliceState = {
  workouts: Workout[];
};

const initialState: WorkoutsSliceState = {
  workouts: [
    {
      id: 0,
      name: "push",
      templateImage:
        "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2016/09/Bodybuilder-Working-Out-His-Upper-Body-With-Cable-Crossover-Exercise.jpg?quality=86&strip=all",
      exercises: [],
    },
  ],
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
