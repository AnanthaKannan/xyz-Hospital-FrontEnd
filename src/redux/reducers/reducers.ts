// reducers.ts
import ActionTypes from '../actionTypes'
import { initialState, AppState } from '../initialState'

const rootReducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case ActionTypes.START:
      return { ...state, loading: true }
    case ActionTypes.END:
      return { ...state, loading: false }
    case ActionTypes.LIST_FEEDBACK:
      return {
        ...state,
        feedBackListData: {
          data: action.payload,
          error: action.error,
          totalCount: action.tc
        },
      };
    case ActionTypes.ADD_FEEDBACK:
      return {
        ...state,
        refresh: action.success ? !state.refresh : state.refresh,
        addFeedBack: {
          error: action.error,
          success: action.success,
        },
      };
    case ActionTypes.UPDATE_FEEDBACK:
      return {
        ...state,
        refresh: action.success ? !state.refresh : state.refresh,
        updateFeedback: {
          error: action.error,
          success: action.success,
        },
      };
    default:
      return state;
  }
};

export default rootReducer;
