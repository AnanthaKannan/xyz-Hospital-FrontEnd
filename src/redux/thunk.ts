import { createAsyncThunk } from '@reduxjs/toolkit';
import {
  listFeedBack,
  addFeedBack,
  updateFeedBack,
} from '../service/service'
import { FeedBackArg } from '../type/type'
import { getTotalCount } from '../lib'

export const listFeedBackThunk = createAsyncThunk('feedback/list', async (param: FeedBackArg) => {
  const result = await listFeedBack(param)
  return { data: result.data, tc: getTotalCount(result) };
})

export const addFeedBackThunk = createAsyncThunk('feedback/add', async (data: any) => {
  const result = await addFeedBack(data)
  return { data: result.data};
})

export const updateFeedBackThunk = createAsyncThunk('feedback/update', async ({ _id, data}: any) => {
  const result = await updateFeedBack(_id, data)
  return { data: result.data};
})