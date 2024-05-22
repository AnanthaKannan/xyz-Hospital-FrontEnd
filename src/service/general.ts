import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface Country {
  code: string;
  country: string;
}

export interface QueryParams {
  country_code?: string;
  state_code?: string;
}


// const transformResponse = (response, meta) => ({
//   data: response,
//   tc: meta?.response?.headers.get('X-Total-Count')
// })

export const generalApi = createApi({
  reducerPath: "general",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://u2f00s7xt0.execute-api.us-east-1.amazonaws.com/dev/",
    prepareHeaders: (headers) => {
      headers.set('authorization', `${localStorage.getItem('token')}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getAddress: build.query<Country[], QueryParams>({
      query: (params) => ({
        url: 'address',
        method: 'GET',
        params,
      }),
      transformResponse: (response: Country[]) => {
        return response
      },
    }),
  })
});

export const {
  useGetAddressQuery
} = generalApi;
