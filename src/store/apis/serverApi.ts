import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Template } from "../../entities/template.entity";
import { SignUpFormValues } from "../../screens/SignUpScreen";
import { User } from "../../entities/user.entity";
import { Exercise } from "../../entities/exercise.entity";
import { FormValues } from "../../contexts/WorkoutForm.context";
import { Workout } from "../../entities/workout.entity";

const dynamicBaseQuery = async (args: any, api: any, extraOptions: any) => {
  const baseQuery = fetchBaseQuery({
    baseUrl: "http://192.168.1.100:8080",
    prepareHeaders: (headers, { getState }: { getState: any }) => {
      const token = getState().userSlice.token;
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  return baseQuery(args, api, extraOptions);
};
export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: dynamicBaseQuery,
  endpoints: (build) => ({
    login: build.mutation<
      { token: string },
      { email: string; password: string }
    >({
      query: (credentials) => ({
        url: `users/login`,
        method: "POST",
        body: credentials,
      }),
    }),
    register: build.mutation<void, SignUpFormValues>({
      query: (userData) => ({
        url: `users/register`,
        method: "POST",
        body: userData,
      }),
    }),
    addTemplate: build.mutation<Template, FormValues>({
      query: (template) => ({
        url: `templates/addTemplate`,
        method: "POST",
        body: template,
      }),
    }),
    addWorkout: build.mutation<Workout, FormValues>({
      query: (workout) => ({
        url: `workouts/addWorkout`,
        method: "POST",
        body: workout,
      }),
    }),
    getUserData: build.query<User, number>({
      query: (userId) => `users/getData/${userId}`,
    }),
    getTemplates: build.query<Template[], number>({
      query: (userId) => `templates/getTemplates/${userId}`,
    }),
    getExercises: build.query<Exercise[], void>({
      query: () => `exercises/getExercises`,
    }),
  }),
});

export const {
  useGetTemplatesQuery,
  useLoginMutation,
  useRegisterMutation,
  useLazyGetUserDataQuery,
  useGetExercisesQuery,
  useAddTemplateMutation,
  useAddWorkoutMutation,
} = serverApi;
