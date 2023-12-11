import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
// import { addLoaderInArray } from '../../lib'
import { patientInitialState } from '../initialState'
import { listPatientThunk, deletePatientThunk } from '../thunk'

const feedBackSlice = createSlice({
  name: 'patient',
  initialState: patientInitialState,
  reducers: {
  },
  extraReducers: (builder) => {
    // list Patient
    builder.addCase(listPatientThunk.pending, (state) => {
      state.patientList.loading = true;
    })
    builder.addCase(listPatientThunk.fulfilled, (state, { payload }) => {
      state.patientList.loading = false;
      state.patientList.data = payload.data;
      state.patientList.tc = payload.tc;
    })
    builder.addCase(listPatientThunk.rejected, (state, action) => {
      console.error('Error fetching user:', action.error);
      state.patientList.loading = false
      state.patientList.error = action.error.message
    })

    // delete patient
    builder.addCase(deletePatientThunk.pending, (state) => {
      state.deletePatient.loading = true;
    })
    builder.addCase(deletePatientThunk.fulfilled, (state, { payload }) => {
      state.deletePatient.loading = false;
      state.deletePatient.success = true;
      state.refresh = !state.refresh;
      toast.success('Patient deleted successfully.');
    })
    builder.addCase(deletePatientThunk.rejected, (state, action) => {
      console.error('Error fetching user:', action.error);
      toast.error('Oops! Something went wrong. Please try again later.');
      state.deletePatient.loading = false
      state.deletePatient.error = action.error.message
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