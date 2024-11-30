import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery"

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
  baseQuery,
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
    }),
    addPatient: build.mutation({
      query: (body) => ({
        url: 'patient',
        method: 'POST',
        body
      }),
      invalidatesTags: [{ type: 'Patients', id: 'LIST' }],
    }),
    updatePatient: build.mutation({
      query: ({ id, body }) => ({
        url: `patient/${id}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: [{ type: 'Patients', id: 'LIST' }],
    })
  })
});

export const {
  useGetPatientsQuery,
  useLazyGetPatientsQuery,
  useDeletePatientMutation,
  useUpdatePatientMutation,
  useAddPatientMutation
} = patientApi;
