import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
export interface Patient {
  _id: string;
  id: number;
  isDeleted: boolean;
  message: string;
  subject: string;
  updatedAt: string;
}

export interface QueryParams {
  project?: string;
  filter?: string;
  limit?: number;
  skip?: number;
}

type PatinetResponse = {
  data: Patient[],
  tc: number
}

// const transformResponse = (response, meta) => ({
//   data: response,
//   tc: meta?.response?.headers.get('X-Total-Count')
// })

export const patientApi = createApi({
  reducerPath: "patients",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://u2f00s7xt0.execute-api.us-east-1.amazonaws.com/dev/",
    prepareHeaders: (headers) => {
      headers.set('authorization', `${localStorage.getItem('token')}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
    getPatients: build.query<PatinetResponse, QueryParams>({
      query: (params) => ({
        url: 'patient',
        method: 'GET',
        params,
      }),
      transformResponse: (response, meta) => {
        return {
          data: response,
          tc: meta?.response?.headers.get('X-Total-Count')
        }
      },
      providesTags: [{ type: 'Patients', id: 'LIST' }],
    }),
    deletePatient: build.mutation({
      query: ({ id }) => ({
        url: `patient/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Patients', id: 'LIST' }],
    })
  })
});

export const {
  useGetPatientsQuery,
  useLazyGetPatientsQuery,
  useDeletePatientMutation,
} = patientApi;
