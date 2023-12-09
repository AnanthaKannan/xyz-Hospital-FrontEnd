import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import feedBackReducer from './slice/feedbackSlice'

import logger from 'redux-logger'

export const store = configureStore({
  reducer: {
    feedBack: feedBackReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch