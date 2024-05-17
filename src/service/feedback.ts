import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface FeedBack {
  _id: string;
  id: number;
  isDeleted: boolean;
  message: string;
  subject: string;
  updatedAt: string;
}

export interface QueryParams {
  project: string;
  filter: string;
  limit: number;
  skip: number;
}

type FeedBacksResponse = FeedBack[];

export const feedBackApi = createApi({
  reducerPath: "postsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://u2f00s7xt0.execute-api.us-east-1.amazonaws.com/dev/",
    prepareHeaders: (headers) => {
      headers.set('authorization', `${localStorage.getItem('token')}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getFeedBacks: build.query<FeedBacksResponse, QueryParams>({
      query: ({ project, filter, limit, skip }) => `feedback?limit=${limit}&skip=${skip}`,
    }),
    getPost: build.query<FeedBack, number>({
      query: (id) => `feedback/${id}`,
    }),
  })
});


export const {
  useGetFeedBacksQuery,
  useGetPostQuery,
} = feedBackApi;
