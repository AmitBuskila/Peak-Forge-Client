import { createApi } from "@reduxjs/toolkit/query/react";
import { FormValues } from "../../contexts/WorkoutForm.context";
import { Exercise } from "../../entities/exercise.entity";
import { Template } from "../../entities/template.entity";
import { User } from "../../entities/user.entity";
import { Workout } from "../../entities/workout.entity";
import { SignUpFormValues } from "../../screens/SignUpScreen";
import { customBaseQuery } from "../baseQuery";

export const serverApi = createApi({
  reducerPath: "serverApi",
  baseQuery: customBaseQuery,
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
    updateTemplate: build.mutation<
      Template,
      { template: any; templateId: number }
    >({
      query: ({ template, templateId }) => ({
        url: `templates/updateTemplate/${templateId}`,
        method: "PUT",
        body: template,
      }),
    }),
    removeTemplate: build.mutation<
      { deletedId: number },
      { templateId: number }
    >({
      query: ({ templateId }) => ({
        url: `templates/removeTemplate/${templateId}`,
        method: "DELETE",
        body: templateId,
      }),
    }),
    getExercisesLatestResults: build.mutation<
      Workout,
      { userId: number; exerciseIds: number[] }
    >({
      query: ({ userId, exerciseIds }) => ({
        url: `exercises/getLatestResults`,
        method: "POST",
        body: { userId, exerciseIds },
      }),
    }),
    getUserData: build.query<User, number>({
      query: (userId) => `users/getData/${userId}`,
    }),
    getUserWorkouts: build.query<Workout[], number>({
      query: (userId) => `workouts/getWorkouts/${userId}`,
    }),
    getLatestWorkout: build.query<Workout | null, number>({
      query: (templateId) => `workouts/getLatestWorkout/${templateId}`,
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
  useRemoveTemplateMutation,
  useRegisterMutation,
  useLazyGetUserDataQuery,
  useLazyGetExercisesQuery,
  useAddTemplateMutation,
  useAddWorkoutMutation,
  useUpdateTemplateMutation,
  useLazyGetUserWorkoutsQuery,
  useGetExercisesLatestResultsMutation,
  useLazyGetLatestWorkoutQuery,
} = serverApi;
