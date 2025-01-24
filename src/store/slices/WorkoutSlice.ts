import { createSlice, Slice } from "@reduxjs/toolkit";
import { Workout } from "../../../types/template";

export type WorkoutsSliceState = {
  workouts: Workout[];
};

const workout: Workout = {
  id: 0,
  name: "push",
  templateImage:
    "https://i0.wp.com/www.muscleandfitness.com/wp-content/uploads/2016/09/Bodybuilder-Working-Out-His-Upper-Body-With-Cable-Crossover-Exercise.jpg?quality=86&strip=all",
  exercises: [
    {
      id: 1,
      label: "Flat Dumbbell Press",
      imageUri:
        "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
      sets: [
        { id: 1, weight: 20, minReps: 8, maxReps: 12 },
        { id: 2, weight: 22.5, minReps: 8, maxReps: 12 },
        { id: 3, weight: 25, minReps: 8, maxReps: 12 },
      ],
    },
    {
      id: 2,
      label: "Incline Dumbbell Press",
      imageUri:
        "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
      sets: [
        { id: 1, weight: 17.5, minReps: 8, maxReps: 12 },
        { id: 2, weight: 20, minReps: 8, maxReps: 12 },
        { id: 3, weight: 22.5, minReps: 8, maxReps: 12 },
      ],
    },
    {
      id: 3,
      label: "Overhead Shoulder Press",
      imageUri:
        "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
      sets: [
        { id: 1, weight: 15, minReps: 8, maxReps: 12 },
        { id: 2, weight: 17.5, minReps: 8, maxReps: 12 },
        { id: 3, weight: 20, minReps: 8, maxReps: 12 },
      ],
    },
    {
      id: 4,
      label: "Cable Crossover",
      imageUri:
        "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
      sets: [
        { id: 1, weight: 10, minReps: 12, maxReps: 15 },
        { id: 2, weight: 12.5, minReps: 12, maxReps: 15 },
        { id: 3, weight: 15, minReps: 12, maxReps: 15 },
      ],
    },
    {
      id: 5,
      label: "Tricep Pushdown",
      imageUri:
        "https://static.strengthlevel.com/images/exercises/bench-press/bench-press-400.avif",
      sets: [
        { id: 1, weight: 20, minReps: 12, maxReps: 15 },
        { id: 2, weight: 25, minReps: 12, maxReps: 15 },
        { id: 3, weight: 30, minReps: 12, maxReps: 15 },
      ],
    },
  ],
};

const initialState: WorkoutsSliceState = {
  workouts: [workout],
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
