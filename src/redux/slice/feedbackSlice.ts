import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addLoaderInArray } from '../../lib'
import { feedBackInitialState } from '../initialState'
import {
  listFeedBackThunk,
  addFeedBackThunk,
  updateFeedBackThunk
} from '../thunk'

const feedBackSlice = createSlice({
  name: 'feedback',
  initialState: feedBackInitialState,
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
    builder.addCase(addFeedBackThunk.fulfilled, (state) => {
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

    // update feedback
    builder.addCase(updateFeedBackThunk.pending, (state, { meta }) => {
      state.feedBackList.data = addLoaderInArray(state.feedBackList.data, meta.arg._id, true)
      state.updateFeedback.loading = true;
    })
    builder.addCase(updateFeedBackThunk.fulfilled, (state) => {
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