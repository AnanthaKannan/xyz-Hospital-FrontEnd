// actions.ts
import { Dispatch } from 'redux';
import { toast } from 'react-toastify';

import { ActionTypes as AT } from '../actionTypes'
import { listFeedBack, addFeedBack, updateFeedBack } from '../../service/service'

const getTotalCount = (result): number => {
  return result.headers['x-total-count'];
}

// Asynchronous action using redux-thunk
export const listFeedBackAct = (params) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: AT.START });
      const result = await listFeedBack(params);
      const tc = getTotalCount(result)
      dispatch({ type: AT.LIST_FEEDBACK, payload: result.data, error: null, tc });
    } catch (error) {
      console.error('Error fetching user:', error);
      dispatch({ type: AT.LIST_FEEDBACK, payload: [], error: error.message, tc: 0 });
    } finally {
      dispatch({ type: AT.END });
    }
  };
};

export const addFeedBackAct = (body) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: AT.START });
      await addFeedBack(body);
      toast.success('successfully added');
      dispatch({ type: AT.ADD_FEEDBACK, error: null, success: true });
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error(error.message)
      dispatch({ type: AT.ADD_FEEDBACK, error: error.message, success: false });
    } finally {
      dispatch({ type: AT.END });
    }
  };
};

export const updateFeedBackAct = (id, body) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch({ type: AT.START });
      await updateFeedBack(id, body);
      toast.success('successfully deleted');
      dispatch({ type: AT.UPDATE_FEEDBACK, error: null, success: true });
    } catch (error) {
      console.error('Error fetching user:', error);
      toast.error(error.message)
      dispatch({ type: AT.UPDATE_FEEDBACK, error: error.message, success: false });
    } finally {
      dispatch({ type: AT.END });
    }
  };
};
