import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import logger from 'redux-logger'

import feedBackReducer from './slice/feedbackSlice'
import patientSlice from './slice/patientSlice'

export const store = configureStore({
  reducer: {
    feedBack: feedBackReducer,
    patient: patientSlice
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch