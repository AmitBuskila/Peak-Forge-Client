import { template } from "@babel/core";
import { createSlice, Slice } from "@reduxjs/toolkit";

export type WorkoutsSliceState = {
  templates: any[];
  activeWorkout: any;
};

const initialState: WorkoutsSliceState = {
  templates: [],
  activeWorkout: {},
};

export type addTemplateAction = {
  payload: any;
};

const workoutsSlice: Slice = createSlice({
  name: "workoutsSlice",
  initialState,
  reducers: {
    addWorkoutTemplate: (state: WorkoutsSliceState, { payload }) => {
      state.templates = [...state.templates, payload];
    },
  },
});

export const { addWorkoutTemplate } = workoutsSlice.actions;

export default workoutsSlice.reducer;
