import workoutsSlice from "./slices/WorkoutSlice";
import userSlice from "./slices/UserSlice";
import { serverApi } from "./apis/serverApi";
import { configureStore, Store } from "@reduxjs/toolkit";

export const store: Store = configureStore({
  reducer: {
    workoutsSlice,
    userSlice,
    [serverApi.reducerPath]: serverApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(serverApi.middleware),
});
