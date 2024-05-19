import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
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
}

type DoctorResponse = {
  data: Doctor[],
  tc: number
}

export const doctorApi = createApi({
  reducerPath: "doctors",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://u2f00s7xt0.execute-api.us-east-1.amazonaws.com/dev/",
    prepareHeaders: (headers) => {
      headers.set('authorization', `${localStorage.getItem('token')}`);
      return headers;
    },
  }),
  endpoints: (build) => ({
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
    deleteDoctor: build.mutation({
      query: ({ id }) => ({
        url: `doctor/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'Doctor', id: 'LIST' }],
    })
  })
});

export const {
  useGetDoctorsQuery,
  useDeleteDoctorMutation,
} = doctorApi;
