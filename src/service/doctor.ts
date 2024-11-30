import { createApi,  } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "./baseQuery"

type WeekDaysAvailability = {
  sunday: boolean;
  monday: boolean;
  tuesday: boolean;
  wednesday: boolean;
  thursday: boolean;
  friday: boolean;
  saturday: boolean;
};

type TimeRange = {
  from: string;
  to: string;
};


export interface Doctor {
  _id: string;
  id: number;
  alternatePhone: boolean;
  email: string;
  gender: string;
  isDeleted: string;
  licenseExpiryDate: string;
  name: string;
  phone: string;
  specialist: string;
  timePerPatient: string;
  updatedAt: string;
  availableDay: WeekDaysAvailability;
  availableTime: TimeRange[];
}

export interface QueryParams {
  project?: string;
  filter?: string;
  limit?: number;
  skip?: number;
  id?: string;
}

type DoctorResponse = {
  data: Doctor[],
  tc: number
}

export const doctorApi = createApi({
  reducerPath: "doctors",
  baseQuery,
  endpoints: (build) => ({
    addDoctor: build.mutation({
      query: (body) => ({
        url: 'doctor',
        method: 'POST',
        body,
      }),
      invalidatesTags: [{ type: 'Doctor', id: 'LIST' }, { type: 'Doctor', id: 'Details' }],
    }),
    updateDoctor: build.mutation({
      query: ({id, body}) => ({
        url: `doctor/${id}`,
        method: 'PUT',
        body,
      }),
      invalidatesTags: [{ type: 'Doctor', id: 'LIST' }, { type: 'Doctor', id: 'Details' }],
    }),
    getDoctors: build.query<DoctorResponse, QueryParams>({
      query: (params) => ({
        url: 'doctor',
        method: 'GET',
        params,
      }),
      transformResponse: (response, meta) => {
        return {
          data: response,
          tc: meta?.response?.headers.get('X-Total-Count')
        }
      },
      providesTags: [{ type: 'Doctor', id: 'LIST' }],
    }),
    getDoctorsById: build.query<Doctor, QueryParams>({
      query: ({id, params}) => ({
        url: `doctor/${id}`,
        method: 'GET',
        params,
      }),
      providesTags: [{ type: 'Doctor', id: 'Details' }],
    }),
    deleteDoctor: build.mutation({
      query: ({ id }) => ({
        url: `doctor/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Doctor', id: 'LIST' }, { type: 'Doctor', id: 'Details' }],
    })
  })
});

export const {
  useGetDoctorsQuery,
  useGetDoctorsByIdQuery,
  useDeleteDoctorMutation,
  useAddDoctorMutation,
  useUpdateDoctorMutation
} = doctorApi;
