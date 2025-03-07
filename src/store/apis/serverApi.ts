import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Template } from "../../entities/template.entity";
import { SignUpFormValues } from "../../screens/SignUpScreen";

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
    getTemplates: build.query<Template[], number>({
      query: (userId) => `templates/getTemplates/${userId}`,
    }),
  }),
});

export const { useGetTemplatesQuery, useLoginMutation, useRegisterMutation } =
  serverApi;
