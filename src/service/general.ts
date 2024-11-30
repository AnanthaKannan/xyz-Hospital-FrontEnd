import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery"

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
  baseQuery,
  endpoints: (build) => ({
    getAddress: build.query<Country[], QueryParams>({
      query: (params) => ({
        url: 'address',
        method: 'GET',
        params,
      }),
      keepUnusedDataFor: 3600,  // 1 hour cache
      transformResponse: (response: Country[]) => {
        return response
      },
    }),
  })
});

export const {
  useGetAddressQuery
} = generalApi;
