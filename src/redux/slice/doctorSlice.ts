import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { addLoaderInArray } from '../../lib'
import { doctorInitialState } from '../initialState'
import { listDoctorThunk, deleteDoctorThunk } from '../thunk'

const feedBackSlice = createSlice({
  name: 'doctor',
  initialState: doctorInitialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // list Doctor
    builder.addCase(listDoctorThunk.pending, (state) => {
      state.doctorList.loading = true;
    })
    builder.addCase(listDoctorThunk.fulfilled, (state, { payload }) => {
      state.doctorList.loading = false;
      state.doctorList.data = payload.data;
      state.doctorList.tc = payload.tc;
    })
    builder.addCase(listDoctorThunk.rejected, (state, action) => {
      console.error('Error fetching user:', action.error);
      toast.error('Oops! Something went wrong. Please try again later.');
      state.doctorList.loading = false
      state.doctorList.error = action.error.message
    })

    // delete Doctor
    builder.addCase(deleteDoctorThunk.pending, (state) => {
      state.deleteDoctor.loading = true;
    })
    builder.addCase(deleteDoctorThunk.fulfilled, (state, { payload }) => {
      state.deleteDoctor.loading = false;
      state.deleteDoctor.success = true;
      state.refresh = !state.refresh;
      toast.success('Doctor deleted successfully');
    })
    builder.addCase(deleteDoctorThunk.rejected, (state, action) => {
      console.error('Error fetching user:', action.error);
      toast.error('Oops! Something went wrong. Please try again later.');
      state.deleteDoctor.loading = false
      state.deleteDoctor.error = action.error.message
    })

    // // add feedback
    // builder.addCase(updateFeedBackThunk.pending, (state, { meta }) => {
    //   state.feedBackList.data = addLoaderInArray(state.feedBackList.data, meta.arg._id, true)
    //   state.updateFeedback.loading = true;
    // })
    // builder.addCase(updateFeedBackThunk.fulfilled, (state, { payload }) => {
    //   state.updateFeedback.loading = false;
    //   state.updateFeedback.success = true;
    //   state.refresh = !state.refresh;
    //   toast.success('successfully deleted');
    // })
    // builder.addCase(updateFeedBackThunk.rejected, (state, action) => {
    //   console.error('Error fetching user:', action.error);
    //   state.feedBackList.data = addLoaderInArray(state.feedBackList.data, action.meta.arg._id, true)
    //   state.updateFeedback.loading = false
    //   state.updateFeedback.error = action.error.message
    // })
  }
})

export default feedBackSlice.reducer;