import { configureStore, Store } from "@reduxjs/toolkit";
import workoutsSlice from "./slices/WorkoutSlice";

export const store: Store = configureStore({
  reducer: {
    workoutsSlice,
  },
});
