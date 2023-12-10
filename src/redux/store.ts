import { configureStore } from '@reduxjs/toolkit'
// import logger from 'redux-logger'

import feedBackReducer from './slice/feedbackSlice'
import patientSlice from './slice/patientSlice'
import doctorSlice from './slice/doctorSlice'

export const store = configureStore({
  reducer: {
    feedBack: feedBackReducer,
    patient: patientSlice,
    doctor: doctorSlice,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch