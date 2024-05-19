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

type FeedBacksResponse = {
  data: FeedBack[],
  tc: number
}

export const feedBackApi = createApi({
  reducerPath: "feedback",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://u2f00s7xt0.execute-api.us-east-1.amazonaws.com/dev/",
    prepareHeaders: (headers) => {
      headers.set('authorization', `${localStorage.getItem('token')}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getFeedBacks: build.query<FeedBacksResponse, QueryParams>({
      query: (params) => ({
        url: 'feedback',
        method: 'GET',
        params,
      }),
      transformResponse: (response, meta) => {
        return {
          data: response,
          tc: meta?.response?.headers.get('X-Total-Count')
        }
      },
      providesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),
    updateFeedback: build.mutation({
      query: ({ id, body }) => ({
        url: `feedback/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    }),
    addFeedback: build.mutation({
      query: (body) => ({
        url: 'feedback',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Feedback', id: 'LIST' }],
    })
  })
});


export const {
  useGetFeedBacksQuery,
  useUpdateFeedbackMutation,
  useAddFeedbackMutation
} = feedBackApi;
