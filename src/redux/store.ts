import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit'
import { feedBackApi } from "../service/feedback";
import { patientApi } from "../service/patient";
import { doctorApi } from "../service/doctor";
import feedBackReducer from './slice/feedbackSlice'
import patientSlice from './slice/patientSlice'
import doctorSlice from './slice/doctorSlice'

export const createStore = (
  options?: ConfigureStoreOptions["preloadedState"] | undefined
) =>
  configureStore({
    reducer: {
      feedBack: feedBackReducer,
      patient: patientSlice,
      doctor: doctorSlice,
      [feedBackApi.reducerPath]: feedBackApi.reducer,
      [patientApi.reducerPath]: patientApi.reducer,
      [doctorApi.reducerPath]: doctorApi.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat([feedBackApi.middleware, patientApi.middleware, doctorApi.middleware]),
    ...options
  });

export const store = createStore();

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch