import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { FeedBackArg } from '../type/type'


import {
  listFeedBack,
  addFeedBack,
  updateFeedBack,
} from '../service/service'

interface AppState {
  loading: boolean;
  refresh: boolean;
  feedBackList: {
    data: any[],
    tc: number,
    error: string,
    loading: boolean,
  };
  addFeedBack: {
    error: string,
    success: boolean,
    loading: boolean,
  },
  updateFeedback: {
    error: string,
    success: boolean,
    loading: boolean,
  },
}

const initialState: AppState = {
  loading: false,
  refresh: false,
  feedBackList: {
    data: [],
    tc: 0,
    error: '',
    loading: false,
  },
  addFeedBack: {
    error: '',
    success: true,
    loading: false,
  },
  updateFeedback: {
    error: '',
    success: true,
    loading: false,
  },
}

const getTotalCount = (result): number => {
  const tc: string = result.headers['x-total-count']
  if(tc) return Number(tc)
  return 0
}

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

const addLoaderInArray = (listData: any[], id: string, loading: boolean) => {
  return listData.map((obj) => {
    if(id === obj._id) obj.loading = loading;
    return obj
  })
}

const feedBackSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    testRed: (state, { payload }) => {
    }
  },
  extraReducers: (builder) => {
    // list feedback
    builder.addCase(listFeedBackThunk.pending, (state) => {
      state.feedBackList.loading = true;
    })
    builder.addCase(listFeedBackThunk.fulfilled, (state, { payload }) => {
      state.feedBackList.loading = false;
      state.feedBackList.data = payload.data;
      state.feedBackList.tc = payload.tc;
    })
    builder.addCase(listFeedBackThunk.rejected, (state, action) => {
      console.error('Error fetching user:', action.error);
      state.feedBackList.loading = false
      state.feedBackList.error = action.error.message
    })

    // add feedback
    builder.addCase(addFeedBackThunk.pending, (state) => {
      state.addFeedBack.loading = true;
    })
    builder.addCase(addFeedBackThunk.fulfilled, (state, { payload }) => {
      state.addFeedBack.loading = false;
      state.addFeedBack.success = true;
      state.refresh = !state.refresh;
      toast.success('successfully added');
    })
    builder.addCase(addFeedBackThunk.rejected, (state, action) => {
      console.error('Error fetching user:', action.error);
      state.addFeedBack.loading = false
      state.addFeedBack.error = action.error.message
    })

    // add feedback
    builder.addCase(updateFeedBackThunk.pending, (state, { meta }) => {
      state.feedBackList.data = addLoaderInArray(state.feedBackList.data, meta.arg._id, true)
      state.updateFeedback.loading = true;
    })
    builder.addCase(updateFeedBackThunk.fulfilled, (state, { payload }) => {
      state.updateFeedback.loading = false;
      state.updateFeedback.success = true;
      state.refresh = !state.refresh;
      toast.success('successfully deleted');
    })
    builder.addCase(updateFeedBackThunk.rejected, (state, action) => {
      console.error('Error fetching user:', action.error);
      state.feedBackList.data = addLoaderInArray(state.feedBackList.data, action.meta.arg._id, true)
      state.updateFeedback.loading = false
      state.updateFeedback.error = action.error.message
    })
  }
})
export const { testRed } = feedBackSlice.actions
export default feedBackSlice.reducer;